export class AssetSearchModel {
  title: string;
  subTitle: string;
  searchPlaceholder: string;
  recentSearches: any[]; // Assuming recentSearches is an array of objects with relevant properties
  assets: any[]; // Assuming users is an array of objects with relevant properties
  assetsExchanges: any[]; // Assuming userRoles is an array of objects with value and label properties
  addButtonLabel: string;
  emptyMessage: string;
  emptySubMessage: string;
}
