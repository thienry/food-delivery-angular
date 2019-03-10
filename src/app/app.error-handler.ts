import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { NotificationService } from "./components/shared/messages/notification.service";
import { LoginService } from "./components/security/login/login.service";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;

          case 403:
            this.ns.notify(message || "Nao Autorizado.");
            break;

          case 404:
            this.ns.notify(
              message ||
              "Recurso nao encontrado. Verifique o console para mais detalhe."
            );
            break;

          case 422:
            this.ns.notify(
              message ||
              "O servidor compreende o tipo de conteúdo da entidade de solicitação, mas não conseguiu processar o conteúdo contido instruções."
            );
            break;

          case 500:
            this.ns.notify(
              message ||
              "O servidor encontrou uma condição inesperada que impediu o preenchimento da solicitação."
            );
            break;

          case 503:
            this.ns.notify(
              message ||
              "Atualmente, o servidor não pode manipular a solicitação devido a uma sobrecarga temporária ou manutenção programada, que provavelmente será aliviada após algum atraso."
            );

          default:
            break;
        }
      })
    }
    super.handleError(errorResponse);
  }
}
