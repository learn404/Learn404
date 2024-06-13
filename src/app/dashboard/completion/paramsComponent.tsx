'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ParamsComponent() {
  
  const [result, setResult] = useState<string>("");
  const params = useSearchParams();
  const payment_intent = params.get("payment_intent");
  const payment_intent_client_secret = params.get("payment_intent_client_secret");    
  
  useEffect(() => {
    
    const fetchData = async () => {
      // Utilisation d'un composant serveur pour récupérer la clé publique de Stripe
      const response = await fetch('/api/completion/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_intent, payment_intent_client_secret }),
      })

      const data = await response.json();
      setResult(data);
    }

    fetchData();
    }, []);
      
      

  return (
    <div>
      <h1>ParamsComponent</h1>
    </div>
  )
}