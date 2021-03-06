import { AfterViewInit, OnInit, Component, ElementRef, Input } from '@angular/core';
import { TwitterTimelineService } from './twitter-timeline.service';
import TwitterTimelineData from './TwitterTimelineData';
import TwitterTimelineOptions from './TwitterTimelineOptions';

@Component({
  selector: 'ngx-twitter-timeline',
  template: ``,
})
export class TwitterTimelineComponent implements OnInit, AfterViewInit {
  /**
   * The data source definition object for the content to be displayed in the widget.
   * May be a widget ID string for a search API timeline or legacy widget
   */
  @Input() data: TwitterTimelineData;
  /**
   * A hash of additional options to configure the widget
   */
  @Input() opts: TwitterTimelineOptions;
  defaultOpts: TwitterTimelineOptions;
  defaultData: TwitterTimelineData = {
    sourceType: 'url',
    url: 'https://twitter.com/twitterdev',
    screenName: 'twitterdev'
  };

  constructor (
    private element: ElementRef,
    private twitterTimelineService: TwitterTimelineService
  ) { }

  ngOnInit() {
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
  }

  ngAfterViewInit() {
    this.twitterTimelineService
      .loadScript()
      .subscribe(
        twttr => {
          let nativeElement = this.element.nativeElement;
          window['twttr']
            .widgets
            .createTimeline(
              {...this.defaultData, ...this.data},
              nativeElement,
              {...this.defaultOpts, ...this.opts}
            )
            .then(embed => {
              // console.log(embed);
            })
            .catch(error => console.error(error))
        },
        err => console.error(err));
  }
}
