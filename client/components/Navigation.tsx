{/* Desktop Menu */}
<div className="hidden md:flex items-center gap-0">
  {navItems.map((item, index) => (
    <div
      key={`desktop-${index}`}
      className="relative group"
      onMouseEnter={() => setOpenDropdown(item.label)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {item.href && !item.submenu ? (
        <Link
          to={item.href}
          className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors rounded-md"
        >
          {item.label}
        </Link>
      ) : (
        <>
          <button
            className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-colors rounded-md flex items-center gap-1"
            type="button"
          >
            {item.label}
            {item.submenu && <ChevronDown className="h-4 w-4" />}
          </button>

          {/* Dropdown Menu */}
          {item.submenu && openDropdown === item.label && (
            <div className="absolute left-0 mt-0 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-50">
              {item.label === "Research Report" && (
                <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-3 rounded-t-md">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search assets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-700 text-slate-100 placeholder-slate-400 rounded px-3 py-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div
                className={
                  item.label === "Research Report"
                    ? "max-h-64 overflow-y-auto"
                    : ""
                }
              >
                {item.submenu
                  .filter((subitem) =>
                    item.label === "Research Report"
                      ? subitem.label
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      : true
                  )
                  .map((subitem, subindex) => (
                    <Link
                      key={`submenu-${subindex}`}
                      to={subitem.href}
                      className="block px-4 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      {subitem.label}
                    </Link>
                  ))}

                {item.label === "Research Report" &&
                  item.submenu.filter((subitem) =>
                    subitem.label
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="px-4 py-2 text-sm text-slate-400 text-center">
                      No assets found
                    </div>
                  )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  ))}
</div>
