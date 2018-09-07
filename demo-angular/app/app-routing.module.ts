import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";
import {ImageComponent} from "~/image-component/image.component";

const routes: Routes = [
    {path: "", redirectTo: "/(imageOutlet:image)", pathMatch: "full"},
    {path: "image", component: ImageComponent, outlet: "imageOutlet"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
