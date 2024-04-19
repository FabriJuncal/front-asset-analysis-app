export class AssetSearchModel {
  title: string;
  subTitle: string;
  searchPlaceholder: string;
  addButtonLabel: string;
  emptyMessage: string;
  emptySubMessage: string;
}

export class dataModel {
  symbols: string;
  names: string;
  logos: {
    asset1: string,
    asset2: string | null
  };
  investmentPlatform: {
    name: string,
    logo: string
  }
}

// recentSearches: any[]; // Assuming recentSearches is an array of objects with relevant properties
