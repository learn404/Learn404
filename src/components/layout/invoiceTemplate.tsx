"use client";

type InvoiceTemplateProps = {
  id: string;
  invoiceNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  city: string;
  country: string;
  zip: string;
  email: string;
  state?: string;
  code?: string;
  finalPrice?: number;
  discount?: number;
};

export function InvoiceTemplate({
  id,
  invoiceNumber,
  firstName,
  lastName,
  address,
  address2,
  city,
  country,
  zip,
  email,
  state,
  code,
  finalPrice,
  discount,
}: InvoiceTemplateProps) {
  const today = new Date();
  const productPrice = 19.99;

  return (
    <div className="bg-white px-8 py-10 max-w-2xl mx-auto shadow-lg rounded-lg">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center">
          <img className="h-12 w-12 mr-2" src="/img/logo.png" alt="Logo" />
          <div className="text-gray-900 font-bold text-2xl">Learn404</div>
        </div>
        <div className="text-right">
          <div className="text-gray-700 font-bold text-xl mb-2">FACTURE</div>
          <div className="text-xs text-gray-600">Date: {today.toLocaleDateString()}</div>
          <div className="text-xs text-gray-600">FACTURE #: {invoiceNumber}</div>
        </div>
      </div>
      <div className="border-b-2 border-gray-200 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">FACTURÉ À</h2>
        <div className="text-gray-700 mb-1">{firstName} {lastName}</div>
        <div className="text-gray-700 mb-1">{address}</div>
        {address2 && <div className="text-gray-700 mb-1">{address2}</div>}
        <div className="text-gray-700 mb-1">{city}, {country} {zip}</div>
        {state && <div className="text-gray-700 mb-1">{state}</div>}
        <div className="text-gray-700 mb-1">{email}</div>
      </div>
      <table className="w-full text-left mb-8">
        <thead>
          <tr className="bg-gray-100 p-1">
            <th className="text-gray-700 font-bold uppercase py-2 text-sm">Produit</th>
            <th className={`text-gray-700 font-bold uppercase py-2 text-sm ${code ? "text-left" : "text-right"}`}>Prix</th>
            {code && (
              <>
                <th className="text-gray-700 font-bold uppercase py-2 text-sm">Code Promo</th>
                <th className="text-gray-700 font-bold uppercase py-2 text-sm">Réduction</th>
                <th className="text-gray-700 font-bold uppercase py-2 text-sm">Total</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-gray-200">
            <td className="py-4 text-gray-900">Learn404 - Premium</td>
            <td className={`py-4 text-gray-900 ${code ? "text-left" : "text-right"}`}>{productPrice} €</td>
            {code && (
              <>
                <td className="py-4 text-gray-900">{code}</td>
                <td className="py-4 text-gray-900">{discount} %</td>
                <td className="py-4 text-gray-900">{finalPrice} €</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end items-center mb-8 text-gray-900">
        <div className="text-lg mr-2">Total:</div>
        <div className="font-bold text-xl">{code ? finalPrice : productPrice} €</div>
      </div>
      <div className="border-t-2 border-gray-200 pt-8 mb-8">
        <h4 className="text-lg font-bold text-gray-900 mb-2">Délai de paiement</h4>
        <p className="text-gray-700 mb-4">
          À réception facture Passée la date d'échéance ci-dessus, une pénalité de retard de 3 fois le taux légal sera appliquée, (Loi 2008-776 du 4 août 2008) ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 euros (Décret 2012-1115 du 2 octobre 2012).
        </p>
        <h4 className="text-lg font-bold text-gray-900 mb-2">Facturé par</h4>
        <p className="text-gray-700 mb-2">Learn404</p>
        <p className="text-gray-700 mt-4">Paris, France</p>
      </div>
    </div>
  );
}
