import React from 'react';
import { ToastOptions } from 'react-toastify';
import { Subject } from 'rxjs';

export interface INotifier {
  key: string;
  action: 'remove' | 'create';
  content?: React.ReactNode;
  options?: ToastOptions;
}

export class NotifierService {
  private static stream = new Subject<INotifier>();

  public static get messageStream(): Subject<INotifier> {
    return this.stream;
  }

  public static publish(message: INotifier): void {
    this.stream.next(message);
  }

  public static clear(key: string): void {
    this.stream.next({ action: 'remove', key });
  }
}
