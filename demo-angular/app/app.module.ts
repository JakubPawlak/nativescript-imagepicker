import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppComponent } from "./app.component";
import {ImageComponent} from "~/image-component/image.component";
import {AppRoutingModule} from "~/app-routing.module";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [AppComponent, ImageComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule],
})
export class AppModule {}
