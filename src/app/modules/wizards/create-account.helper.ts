interface ICreateAccount {
  accountType: 'personal' | 'corporate';
  accountPlan: '1' | '2' | '3';
  businessName: string;
  businessDescriptor: string;
  businessType: '1' | '2' | '3' | '4' | '5' | '6';
  businessDescription: string;
  businessEmail: string;
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;
}

const inits: ICreateAccount = {
  accountType: 'personal',
  accountPlan: '1',
  businessName: 'Aura Vanguardista',
  businessDescriptor: 'AURA',
  businessType: '2',
  businessDescription: 'Tienda de venta de ropas',
  businessEmail: 'aura.vanguardista@gmail.com',
  nameOnCard: 'Max Doe',
  cardNumber: '4111 1111 1111 1111',
  cardExpiryMonth: '1',
  cardExpiryYear: '2',
  cardCvv: '123',
  saveCard: '1',
};

export { ICreateAccount, inits };
