import { Component, ElementRef, Injectable, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable as Observable$1 } from 'rxjs/Observable';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TwitterTimelineService = (function () {
    function TwitterTimelineService() {
        this.TWITTER_SCRIPT_ID = 'twitter-wjs';
        this.TWITTER_WIDGET_URL = 'https://platform.twitter.com/widgets.js';
    }
    /**
     * @return {?}
     */
    TwitterTimelineService.prototype.loadScript = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable$1.create(function (observer) {
            _this.startScriptLoad();
            window['twttr'].ready(function (twttr) {
                observer.next(twttr);
                observer.complete();
            });
        });
    };
    /**
     * @return {?}
     */
    TwitterTimelineService.prototype.startScriptLoad = /**
     * @return {?}
     */
    function () {
        window['twttr'] = (function (d, s, id, url) {
            var /** @type {?} */ script, /** @type {?} */
            firstScriptEl = d.getElementsByTagName(s)[0], /** @type {?} */
            twitterScript = window['twttr'] || {};
            if (d.getElementById(id)) {
                return twitterScript;
            }
            script = d.createElement(s);
            script.id = id;
            script.src = url;
            firstScriptEl.parentNode.insertBefore(script, firstScriptEl);
            twitterScript._e = [];
            twitterScript.ready = function (f) {
                twitterScript._e.push(f);
            };
            return twitterScript;
        }(document, 'script', this.TWITTER_SCRIPT_ID, this.TWITTER_WIDGET_URL));
    };
    TwitterTimelineService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TwitterTimelineService.ctorParameters = function () { return []; };
    return TwitterTimelineService;
}());

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TwitterTimelineComponent = (function () {
    function TwitterTimelineComponent(element, twitterTimelineService) {
        this.element = element;
        this.twitterTimelineService = twitterTimelineService;
        this.defaultData = {
            sourceType: 'url',
            url: 'https://twitter.com/twitterdev',
            screenName: 'twitterdev'
        };
    }
    /**
     * @return {?}
     */
    TwitterTimelineComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.defaultOpts = {
            tweetLimit: 5
        };
        if (this.data && this.data.sourceType) {
            switch (this.data.sourceType) {
                case 'url':
                    delete this.defaultData.screenName;
                    break;
                case 'profile':
                    delete this.defaultData.url;
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * @return {?}
     */
    TwitterTimelineComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.twitterTimelineService
            .loadScript()
            .subscribe(function (twttr) {
            var /** @type {?} */ nativeElement = _this.element.nativeElement;
            window['twttr']
                .widgets
                .createTimeline(__assign({}, _this.defaultData, _this.data), nativeElement, __assign({}, _this.defaultOpts, _this.opts))
                .then(function (embed) {
                // console.log(embed);
            })
                .catch(function (error) { return console.error(error); });
        }, function (err) { return console.error(err); });
    };
    TwitterTimelineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-twitter-timeline',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    TwitterTimelineComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: TwitterTimelineService, },
    ]; };
    TwitterTimelineComponent.propDecorators = {
        "data": [{ type: Input },],
        "opts": [{ type: Input },],
    };
    return TwitterTimelineComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTwitterTimelineModule = (function () {
    function NgxTwitterTimelineModule() {
    }
    /**
     * @return {?}
     */
    NgxTwitterTimelineModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxTwitterTimelineModule,
            providers: [TwitterTimelineService]
        };
    };
    NgxTwitterTimelineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        TwitterTimelineComponent
                    ],
                    providers: [
                        TwitterTimelineService
                    ],
                    exports: [
                        TwitterTimelineComponent
                    ]
                },] },
    ];
    return NgxTwitterTimelineModule;
}());

export { NgxTwitterTimelineModule, TwitterTimelineComponent, TwitterTimelineService };
