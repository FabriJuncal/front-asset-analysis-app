import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalConfig, ModalComponent } from 'src/app/_metronic/partials';
import { ITradingViewWidget, IntervalTypes, BarStyles, Themes } from 'src/app/_metronic/shared/components/tradingview-graphic-widget/tradingview-graphic-widget.model';
import { CryptoAssetService } from '../services/crypto-asset.service';

@Component({
  selector: 'app-technical-analysis',
  templateUrl: './technical-analysis.component.html',
  styleUrl: './technical-analysis.component.scss'
})
export class TechnicalAnalysisComponent implements OnInit,  AfterViewInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  widgetConfig: ITradingViewWidget;

  constructor() {}

  ngAfterViewInit(): void {

  }

  async openModal() {
    return await this.modalComponent.open();
  }

  logSymbol(event: any){
    console.log('logSymbol event->', event);
  }

  initWidgetTradingView(cryptoPairSelected: string = 'BINANCE:BTCUSDT'){
    this.widgetConfig = {
      symbol: cryptoPairSelected,
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

  ngOnDestroy(): void{
    this.cryptoPairSelectedSubscription.unsubscribe();
  }
}
