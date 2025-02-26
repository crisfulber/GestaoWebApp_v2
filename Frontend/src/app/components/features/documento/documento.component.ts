import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../../services/documento.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Documento } from '../../interface/documento';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-documento',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputMaskModule],
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DocumentoComponent implements OnInit {

  documentos: Documento[] = [];
  documentoDialog: boolean = false;
  documento: Documento = {
    Id: 0,
    CPF: '',
    RG: 0,
    DtEmissaoRG: null,
    OrgaoExpeditor: '',
    UF_RG: '',
    CTPS: 0,
    SerieCTPS: 0,
    DtEmissaoCTPS: '',
    UF_CTPS: '',
    PIS: ''
  };
  submitted: boolean = false;

  constructor(
    private documentoService: DocumentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadDocumentos();
  }

  loadDocumentos() {
    this.documentoService.getDocumentos().subscribe({
      next: (data) => {
        data.forEach(x => {
          x.DtEmissaoCTPS = this.formatarDataParaTela(x.DtEmissaoCTPS);
          x.DtEmissaoRG = this.formatarDataParaTela(x.DtEmissaoRG)
        });
        this.documentos = data;
      }
    })
  }

  openNew() {
    this.documento = {
      Id: 0,
      CPF: '',
      RG: 0,
      DtEmissaoRG: null,
      OrgaoExpeditor: '',
      UF_RG: '',
      CTPS: 0,
      SerieCTPS: 0,
      DtEmissaoCTPS: '',
      UF_CTPS: '',
      PIS: ''
    };
    this.submitted = false;
    this.documentoDialog = true;
  }

  editDocumento(documento: Documento) {
    this.documentoDialog = true;
    this.documento = { ...documento };

    if (this.documento.DtEmissaoRG) {
      this.documento.DtEmissaoRG = this.formatarDataParaTela(this.documento.DtEmissaoRG);
    }
    if (this.documento.DtEmissaoCTPS) {
      this.documento.DtEmissaoCTPS = this.formatarDataParaTela(this.documento.DtEmissaoCTPS);
    }
  }

  formatarDataParaTela(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const regexISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    if (regexISO.test(data)) {
      const dataSemHora = data.split('T')[0];
      const parts = dataSemHora.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regexDDMMYYYY.test(data)) {
      return data;
    }

    console.error("Formato de data inválido:", data);
    return data;
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

  deleteDocumento(documento: Documento) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o documento com CPF ' + documento.CPF + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.documentoService.deleteDocumento(documento.Id).subscribe({
          next: () => {
            this.documentos = this.documentos.filter(val => val.Id !== documento.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Documento Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o documento com CPF ' + documento.CPF, life: 3000 });
            console.error('Erro ao deletar documento:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.documentoDialog = false;
    this.submitted = false;
  }

  saveDocumento() {
    if (this.documento) {
      this.documento.DtEmissaoRG = this.formatarDataParaBanco(this.documento.DtEmissaoRG);
      this.documento.DtEmissaoCTPS = this.formatarDataParaBanco(this.documento.DtEmissaoCTPS);

      if (this.documento.Id) {
        this.documentoService.updateDocumento(this.documento.Id, this.documento).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Documento atualizado com sucesso' });
            this.loadDocumentos();
            this.documentoDialog = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar documento:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar documento' });
          }
        });

      } else {
        this.documentoService.addDocumento(this.documento).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Documento criado com sucesso' });
            this.loadDocumentos();
            this.documentoDialog = false;
          },
          error: (err) => {
            console.error('Erro ao criar documento:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar documento' });
          }
        });
      }
    }
  }

  findIndexById(Id: number): number {
    let index = -1; for (let i = 0; i < this.documentos.length; i++) {
      if (this.documentos[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }
}