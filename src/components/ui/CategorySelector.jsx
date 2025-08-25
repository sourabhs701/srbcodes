"use client";

const CategorySelector = ({
    categories,
    selectedCategory,
    onCategoryChange,
    filteredCount,
    totalCount,
    label = "items"
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                ? "bg-neutral-50 text-black"
                                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="mt-4 text-sm text-neutral-500">
                Showing {filteredCount} of {totalCount} {label}
            </div>
        </div>
    );
};

export default CategorySelector;
