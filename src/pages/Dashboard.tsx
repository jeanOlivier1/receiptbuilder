import React, { useState, useEffect } from 'react';
import { getReceipts } from '../lib/supabase';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Meals');
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReceipts();
  }, [activeCategory]);

  const loadReceipts = async () => {
    try {
      setLoading(true);
      const data = await getReceipts(activeCategory);
      setReceipts(data || []);
    } catch (error) {
      console.error('Error loading receipts:', error);
      toast.error('Failed to load receipts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Receipt History</h1>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveCategory('Meals')}
            className={`flex-1 py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-medium transition-all ${
              activeCategory === 'Meals'
                ? 'bg-[#F8BF1E] text-white'
                : 'bg-white border-2 border-[#F8BF1E] text-[#F8BF1E]'
            }`}
          >
            Meals
          </button>
          <button
            onClick={() => setActiveCategory('Accommodation')}
            className={`flex-1 py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg font-medium transition-all ${
              activeCategory === 'Accommodation'
                ? 'bg-[#F8BF1E] text-white'
                : 'bg-white border-2 border-[#F8BF1E] text-[#F8BF1E]'
            }`}
          >
            Accommodation
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8BF1E] mx-auto"></div>
            <p className="mt-4 text-lg">Loading receipts...</p>
          </div>
        ) : receipts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No receipts found for this category</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Currency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {receipts.map((receipt, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">{receipt.date_recu || 'N/A'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{receipt.company || 'N/A'}</td>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {Array.isArray(receipt.items_purchased) ? receipt.items_purchased.join(', ') : 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                          {receipt.total_amount ? receipt.total_amount.toFixed(2) : 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{receipt.devise || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};