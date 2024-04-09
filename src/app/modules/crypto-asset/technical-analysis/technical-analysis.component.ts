import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from 'src/app/_metronic/partials';
import { ITradingViewWidget, IntervalTypes, BarStyles, Themes } from 'src/app/_metronic/shared/components/tradingview-graphic-widget/tradingview-graphic-widget.model';

@Component({
  selector: 'app-technical-analysis',
  templateUrl: './technical-analysis.component.html',
  styleUrl: './technical-analysis.component.scss'
})
export class TechnicalAnalysisComponent implements AfterViewInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  widgetConfig: ITradingViewWidget;

  constructor() {}

  ngAfterViewInit(): void {
    this.widgetConfig = {
      symbol: 'BINANCE:BTCUSDT',
      allow_symbol_change: false,
      autosize: true,
      enable_publishing: false,
      hideideas: false,
      hide_legend: false,
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      interval: IntervalTypes.D,
      locale: 'en',
      save_image: true,
      show_popup_button: false,
      style: BarStyles.CANDLES,
      theme: Themes.LIGHT,
      timezone: 'Etc/UTC',
      toolbar_bg: '#F1F3F6',
      widgetType: 'widget',
      // width: 1100,
      // height: 500,
      withdateranges: false
    }
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  logSymbol(event: any){
    console.log('logSymbol event->', event);
  }
}
