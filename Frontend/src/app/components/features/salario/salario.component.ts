import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalarioService } from '../../../services/salario.service';
import { PessoaService } from '../../../services/pessoa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { InputMask } from 'primeng/inputmask';
import { Checkbox } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Salario } from '../../interface/salario';
import { Pessoa } from '../../interface/pessoa';

@Component({
  selector: 'app-salario',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule, CurrencyPipe, InputNumber, InputMask,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, DropdownModule, AutoCompleteModule, Checkbox, Select,
    ReactiveFormsModule],
  templateUrl: './salario.component.html',
  styleUrls: ['./salario.component.css'],
  providers: [MessageService, ConfirmationService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SalarioComponent implements OnInit {

  salarios: Salario[] = [];
  pessoas: Pessoa[] = [];
  salarioDialog: boolean = false;
  submitted: boolean = false;
  salarioForm!: FormGroup;
  salario: any;

  constructor(
    private salarioService: SalarioService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.salarioForm = this.fb.group({
      IdPessoa: [''],
      Valor: [0],
      DtAlteracao: [''],
      SalarioAtivo: [false]
    });
  }

  ngOnInit() {
    this.loadSalarios();
    this.loadPessoas();
  }

  loadSalarios() {
    this.salarioService.getSalarios().subscribe({
      next: (data) => {
        this.salarios = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar salários' });
        console.error('Erro ao carregar salários:', error);
      }
    });
  }

  loadPessoas() {
    this.pessoaService.getPessoas().subscribe({
      next: (data) => {
        this.pessoas = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar pessoas' });
        console.error('Erro ao carregar pessoas:', error);
      }
    });
  }

  openNew() {
    this.salarioForm.reset();
    this.submitted = false;
    this.salarioDialog = true;
  }

  editSalario(salario: Salario) {
    this.salario = { ...salario };
    this.salarioDialog = true;
    this.salarioForm.patchValue({
      IdPessoa: salario.IdPessoa,
      Valor: salario.Valor,
      DtAlteracao: this.formatarDataParaTela(salario.DtAlteracao),
      SalarioAtivo: salario.SalarioAtivo
    });
  }

  deleteSalario(salario: Salario) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar este salário?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salarioService.deleteSalario(salario.Id).subscribe({
          next: () => {
            this.salarios = this.salarios.filter(val => val.Id !== salario.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Salário Deletado', life: 3000 });
            this.loadSalarios();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o salário', life: 3000 });
            console.error('Erro ao deletar salário:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.salarioDialog = false;
    this.submitted = false;
  }

  saveSalario() {
    this.submitted = true;

    if (this.salarioForm.valid) {
      const salarioData = this.salarioForm.value;

      const dataISO = this.formatarDataParaBanco(salarioData.DtAlteracao);

      if (dataISO) {
        const pessoaSelecionada = this.pessoas.find(p => p.Id === salarioData.IdPessoa);

        if (pessoaSelecionada) {
          const salarioParaEnviar = { ...salarioData, DtAlteracao: dataISO, Pessoa: pessoaSelecionada, Id: this.salario?.Id };

          if (this.salario?.Id) {
            this.salarioService.updateSalario(this.salario.Id, salarioParaEnviar).subscribe({
              next: () => {
                this.loadSalarios();
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salário Atualizado', life: 3000 });
                this.hideDialog();
              },
              error: (error) => {
                console.error('Erro ao atualizar salário:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar salário', life: 3000 });
              }
            });
          } else {
            this.salarioService.addSalario(salarioData).subscribe({
              next: (data) => {
                this.loadSalarios();
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salário Criado', life: 3000 });
                this.hideDialog();
              },
              error: (error) => {
                console.error('Erro ao criar salário:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar salário', life: 3000 });
              }
            });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formato de data inválido', life: 3000 });
        }
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente', life: 3000 });
      }
    }}

    findIndexById(Id: number): number {
      let index = -1;
      for (let i = 0; i < this.salarios.length; i++) {
        if (this.salarios[i].Id === Id) {
          index = i;
          break;
        }
      }
      return index;
    }

    formatarDataParaTela(data: string | null | undefined): string | null {
      if (!data) {
        return null;
      }

      const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?Z?)?$/;
      const isoMatch = data.match(isoRegex);
      if (isoMatch) {
        const year = parseInt(isoMatch[1], 10);
        const month = parseInt(isoMatch[2], 10);
        const day = parseInt(isoMatch[3], 10);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return `${this.padZero(day)}/${this.padZero(month)}/${year}`;
        }
      }

      const ddmmyyyyRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const ddmmyyyyMatch = data.match(ddmmyyyyRegex);
      if (ddmmyyyyMatch) {
        return data;
      }

      const timestampRegex = /^\d+$/;
      if (timestampRegex.test(data)) {
        const timestamp = parseInt(data, 10);
        if (!isNaN(timestamp)) {
          const date = new Date(timestamp);
          const day = this.padZero(date.getDate());
          const month = this.padZero(date.getMonth() + 1);
          const year = date.getFullYear();
          return `\{day\}/{month}/${year}`;
        }
      }

      console.error("Formato de data inválido:", data);
      return data;
    }

    padZero(num: number): string {
      return num < 10 ? `0${num}` : num.toString();
    }

    formatarDataParaBanco(data: string | null | undefined): string | null {
      if (!data) {
        return null;
      }

      const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
      if (regexYYYYMMDD.test(data)) {
        return data;
      }

      const parts = data.split('/');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }

      console.error("Formato de data inválido para envio ao banco:", data);
      return data;
    }

    getPessoaNome(id: number): string {
      const pessoa = this.pessoas.find(p => p.Id === id);
      return pessoa ? pessoa.NomePessoa || '' : '';
    }
  }