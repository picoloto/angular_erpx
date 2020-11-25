export class CustomConfirmation {
  header = 'Atenção';
  icon = 'pi pi-exclamation-triangle';
  acceptLabel = 'Sim';
  acceptButtonStyleClass = 'p-button-text';
  rejectLabel = 'Não';
  rejectButtonStyleClass = 'p-button-text';
  defaultFocus = 'none';
  message: string;
  accept: CallableFunction;

  constructor(message: string, accept: CallableFunction) {
    this.message = message;
    this.accept = accept;
  }
}
