import { FC, useState, useCallback } from 'react';

interface FilterOption {
    label: string;
    value: string;
}

interface ProductFiltersProps {
    filters: {
        [key: string]: string[]
    };
    onChange: (filters: { [key: string]: string[] }) => void;
}

export const ProductFilters: FC<ProductFiltersProps> = ({ filters, onChange }) => {
    const categories: FilterOption[] = [
        { label: 'Lastest Affiliates', value: 'lastest' },
        { label: 'Featured Affiliates', value: 'featured' },
        { label: 'E-commerce & Retail', value: 'ecommerceRetail' },
        { label: 'Tech & Software', value: 'techSoftware' },
        { label: 'Business & Finance', value: 'BussinessFinance' },
        { label: ' Health & Wellness', value: 'HealthWellness' },
        { label: ' Travel & Lifestyle', value: 'TravelLifestyle' },
        { label: ' Education & Online Learning', value: 'EducationOnline' },
        { label: '  Real Estate & Home Services', value: 'realEstate' }
    ];

    const handleCategoryFilterChange = useCallback((value: string) => {
        onChange({
            ...filters,
            category: filters.category?.includes(value)
                ? filters.category.filter(item => item !== value)
                : [...(filters.category || []), value],
            featured: [], // Clear featured filter
            lastest: []    // Clear latest filter
        });
    }, [filters, onChange]);

    const handleUniqueFilterChange = useCallback((filterType: 'featured' | 'lastest', value: string) => {
        onChange({
            ...filters,
            category: [], // Clear category filters
            featured: filterType === 'featured' ? [value] : [],
            lastest: filterType === 'lastest' ? [value] : []
        });
    }, [filters, onChange]);

    const handleAllCategories = useCallback(() => {
        onChange({
            ...filters,
            category: [],
            featured: [],
            lastest: []
        });
    }, [filters, onChange]);

    return (
        <div className=" p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>

            <div className="relative">
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10  p-2 rounded-fullbg-white"
                    onClick={() => document.getElementById('category-scroll')?.scrollBy(-200, 0)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div
                    id="category-scroll"
                    className="flex overflow-x-auto gap-2 px-8 scrollbar-hide scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                >
                    <button
                        onClick={handleAllCategories}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${!filters.category?.length && !filters.featured?.length && !filters.lastest?.length
                                ? 'bg-teal-500 text-white'
                                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                            }`}
                    >
                        All Categories
                    </button>
                    <button
                        key="lastest"
                        onClick={() => handleUniqueFilterChange('lastest', 'lastest')}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filters.lastest?.includes('lastest')
                            ? 'bg-teal-500 text-white'
                            : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                            }`}
                    >
                        Lastest Affiliates
                    </button>
                    <button
                        key="featured"
                        onClick={() => handleUniqueFilterChange('featured', 'featured')}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filters.featured?.includes('featured')
                            ? 'bg-teal-500 text-white'
                            : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                            }`}
                    >
                        Featured Affiliates
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.value}
                            onClick={() => handleCategoryFilterChange(category.value)}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${filters.category?.includes(category.value)
                                ? 'bg-teal-500 text-white'
                                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                                }`}
                        >
                            {category.label.replace(' Lastest Affiliates', '').replace(' Featured Affiliates', '')}
                        </button>
                    ))}
                </div>

                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-white"
                    onClick={() => document.getElementById('category-scroll')?.scrollBy(200, 0)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};