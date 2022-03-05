"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManageHomeBannerComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var delete_confirm_dialog_component_1 = require("src/app/_common/components/delete-confirm-dialog/delete-confirm-dialog.component");
var environment_1 = require("src/environments/environment");
var ManageHomeBannerComponent = /** @class */ (function () {
    function ManageHomeBannerComponent(homeSrvc, alertSrvc, fb, dialog, pmSrvc) {
        this.homeSrvc = homeSrvc;
        this.alertSrvc = alertSrvc;
        this.fb = fb;
        this.dialog = dialog;
        this.pmSrvc = pmSrvc;
        this.allHomeGridList = [];
        this.firstLoad = true;
        this.homeGridIconBaseUrl = environment_1.environment.baseUrl + "/uploads/home_assets/";
        this.productImageBaseUrl = environment_1.environment.baseUrl + "/uploads/products/";
    }
    ManageHomeBannerComponent.prototype.ngOnInit = function () {
        this.getHomeBanner();
        this.updateHomeGridForm = this.fb.group({
            header: [''],
            description: ['', forms_1.Validators.required],
            image: [''],
            appStore: [''],
            playStore: [''],
            option: [0],
            background_link: [''],
            background_image: ['']
        });
    };
    ManageHomeBannerComponent.prototype.setHomeGridForm = function () {
        console.log(this.homeGridDetails);
        this.updateHomeGridForm.patchValue({
            header: this.homeGridDetails.header,
            description: this.homeGridDetails.description,
            image: this.homeGridDetails.image,
            appStore: this.homeGridDetails.appStore,
            playStore: this.homeGridDetails.playStore,
            option: this.homeGridDetails.option ? this.homeGridDetails.option : 0,
            background_link: this.homeGridDetails.background_link,
            background_image: this.homeGridDetails.background_image && typeof this.homeGridDetails.background_image === 'object' ? this.homeGridDetails.background_image : ''
        });
    };
    ManageHomeBannerComponent.prototype.setEditForm = function (homeGridData) {
        this.homeGridDetails = homeGridData;
        this.homeGridId = homeGridData.id;
        this.setHomeGridForm();
    };
    ManageHomeBannerComponent.prototype.getHomeBanner = function () {
        var _this = this;
        this.homeSrvc.getHomeBanner().subscribe(function (res) {
            if (!res.error) {
                _this.allHomeGridList = res.data;
                _this.setEditForm(_this.allHomeGridList);
            }
        });
    };
    ManageHomeBannerComponent.prototype.updateHomeBanner = function (f) {
        var _this = this;
        var payLoad = JSON.parse(JSON.stringify(this.updateHomeGridForm.value));
        console.log(payLoad);
        this.homeSrvc.saveHomeBanner({ record: payLoad }).subscribe(function (res) {
            if (!res.error) {
                $(window).scrollTop(0);
                f.resetForm();
                _this.alertSrvc.success("Saved successfully.");
                _this.getHomeBanner();
            }
        });
    };
    ManageHomeBannerComponent.prototype.readFile = function (e) {
        var _this = this;
        var input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            this.homeSrvc.uploadSocialIcon(input.files[0]).pipe(operators_1.first()).subscribe(function (res) {
                if (!res.error) {
                    _this.updateHomeGridForm.patchValue({
                        'image': res.data.filename
                    });
                }
            });
        }
    };
    ManageHomeBannerComponent.prototype.uploadBackgroundFile = function (e) {
        var _this = this;
        var input = e.target;
        var files = [];
        if (input.files && input.files[0]) {
            for (var i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i]);
            }
            this.pmSrvc.uploadEventImages(files).pipe(operators_1.first()).subscribe(function (res) {
                if (!res.error) {
                    var fileNames_1 = [];
                    if (_this.updateHomeGridForm.value.images && _this.updateHomeGridForm.value.background_image.length) {
                        fileNames_1 = fileNames_1.concat(_this.updateHomeGridForm.value.background_image);
                    }
                    res.data.forEach(function (file) {
                        fileNames_1.push(file.filename);
                    });
                    _this.updateHomeGridForm.patchValue({
                        'background_image': fileNames_1
                    });
                }
            });
        }
    };
    ManageHomeBannerComponent.prototype.initiateDataTable = function () {
        setTimeout(function () {
            $('#member').DataTable({
                //DataTable Options
                "aaSorting": []
            });
        }, 200);
    };
    ManageHomeBannerComponent.prototype.deleteById = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(delete_confirm_dialog_component_1.DeleteConfirmDialogComponent, {
            width: '400px',
            disableClose: true,
            data: { message: "Are you sure to delete the Home grid?" }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.homeSrvc.delteHomeGrid(id).subscribe(function (res) {
                    if (!res.error) {
                        _this.alertSrvc.success("Home grid deleted successfully.");
                        _this.homeSrvc.getAllHomeGridList().subscribe(function (res) {
                            if (!res.error) {
                                _this.allHomeGridList = res.data;
                            }
                        });
                    }
                });
            }
        });
    };
    ManageHomeBannerComponent.prototype.removeImage = function (imageIndex) {
        this.updateHomeGridForm.value.background_image.splice(imageIndex, 1);
    };
    ManageHomeBannerComponent = __decorate([
        core_1.Component({
            selector: 'app-manage-home-banner',
            templateUrl: './manage-home-banner.component.html',
            styleUrls: ['./manage-home-banner.component.scss']
        })
    ], ManageHomeBannerComponent);
    return ManageHomeBannerComponent;
}());
exports.ManageHomeBannerComponent = ManageHomeBannerComponent;
