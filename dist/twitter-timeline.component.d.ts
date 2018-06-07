import { AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { TwitterTimelineService } from './twitter-timeline.service';
import TwitterTimelineData from './TwitterTimelineData';
import TwitterTimelineOptions from './TwitterTimelineOptions';
export declare class TwitterTimelineComponent implements OnInit, AfterViewInit {
    private element;
    private twitterTimelineService;
    /**
     * The data source definition object for the content to be displayed in the widget.
     * May be a widget ID string for a search API timeline or legacy widget
     */
    data: TwitterTimelineData;
    /**
     * A hash of additional options to configure the widget
     */
    opts: TwitterTimelineOptions;
    defaultOpts: TwitterTimelineOptions;
    defaultData: TwitterTimelineData;
    constructor(element: ElementRef, twitterTimelineService: TwitterTimelineService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
