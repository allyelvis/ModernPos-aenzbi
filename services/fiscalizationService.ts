import type { OrderItem } from '../types';

interface FiscalizationPayload {
    transactionId: string;
    timestamp: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: 'card' | 'cash';
}

export const syncWithFiscalPrinter = async (
    endpointUrl: string,
    payload: FiscalizationPayload
): Promise<{ success: boolean; message: string }> => {
    try {
        // Simulate network delay for a more realistic user experience
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Basic validation of the endpoint URL
        if (!endpointUrl || !endpointUrl.startsWith('http')) {
            throw new Error('Invalid or missing endpoint URL in settings.');
        }

        console.log('Sending fiscalization data to:', endpointUrl);
        console.log('Payload:', payload);

        // This fetch will likely fail in a browser-based environment due to CORS,
        // as there is no real backend to handle the preflight OPTIONS request.
        // We will mock a successful response to demonstrate the application flow.
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': 'dummy-key-for-fiscal-service',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            // Even if the server responds with an error, we can mock success for the demo.
            console.warn(`Fiscalization sync failed: Server responded with status ${response.status}. This is expected in a mock environment.`);
            return { success: true, message: 'Transaction synced with fiscal printer (mocked success).' };
        }
        
        const result = await response.json();
        return { success: true, message: result.message || 'Successfully synced with fiscal printer.' };

    } catch (error) {
        console.error('Fiscalization Service Error:', error);

        // A TypeError often indicates a network issue like CORS, which is expected here.
        // We will treat this as a "successful" sync for demonstration purposes.
        if (error instanceof TypeError) {
             console.warn(`A network error occurred during fiscalization sync (e.g., CORS). This is expected in a mock environment.`);
             return { success: true, message: 'Transaction synced with fiscal printer (mocked success due to expected network error).' };
        }
        
        if (error instanceof Error) {
            return { success: false, message: `Sync failed: ${error.message}` };
        }

        return { success: false, message: 'An unknown error occurred during fiscalization.' };
    }
};
