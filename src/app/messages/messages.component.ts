import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ConfigService } from '../services/config.service';
import { Config } from '../model/config';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  config: Config;
  headers: string[];
  error: any;
  constructor(public messageService: MessageService, private configService: ConfigService) { }

  ngOnInit() {
  }


  showConfig() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }


  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body };
      });
    }
}
