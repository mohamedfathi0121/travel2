const tabs = ["On Going", "Completed"];

export default function TripTabs({ currentTab, setCurrentTab }) {
  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 border-b mb-6 bg-background">
      {tabs.map((tab) => {
        const isActive = currentTab === tab;
        return (
          <button
            key={tab}
            className={`py-2 px-2 sm:px-4 text-sm sm:text-base font-medium border-b-2 transition-colors duration-200 ${
              isActive
                ? "border-text-primary text-text-primary"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
