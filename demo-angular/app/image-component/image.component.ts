import {Component} from '@angular/core';
import * as imagepicker from "nativescript-imagepicker";

@Component({
    selector: 'app-image',
    template: `
        <GridLayout rows="*, auto, auto">
            <ListView [items]="imageAssets">
                <ng-template let-image="item" let-i="index">
                    <GridLayout columns="auto, *">
                        <Image
                                [width]="thumbSize"
                                [height]="thumbSize"
                                [src]="image" stretch="fill"></Image>
                        <Label col="1" [text]="'image ' + i"></Label>
                    </GridLayout>
                </ng-template>
            </ListView>
    
            <Image [src]="imageSrc" *ngIf="isSingleMode" [width]="previewSize" [height]="previewSize"
                   stretch="aspectFit"></Image>
            <Button row="1" text="Pick Single" (tap)="onSelectSingleTap()" horizontalAlignment="center"></Button>
            <Button row="2" text="Pick Multiple" (tap)="onSelectMultipleTap()" horizontalAlignment="center"></Button>
        </GridLayout>
    `
})
export class ImageComponent {
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    previewSize: number = 300;
    thumbSize: number = 80;

    constructor() {
    }

    public onSelectMultipleTap() {
        this.isSingleMode = false;

        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
            .authorize()
            .then(() => {
                that.imageAssets = [];
                that.imageSrc = null;
                return context.present();
            })
            .then((selection) => {
                console.log("Selection done: " + JSON.stringify(selection));
                that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

                // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                selection.forEach(function (element) {
                    element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                    element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
                });

                that.imageAssets = selection;
            }).catch(function (e) {
            console.log(e);
        });
    }
}
