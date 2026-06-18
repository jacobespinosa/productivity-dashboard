function SideBar() {
  return (
    <aside className="surface border-r-2 border-theme w-3xs h-screen">
      <div className="h-16 p-4 text-center text-2xl">
        <a href="#">App Name</a>
      </div>

      <div className="flex flex-col mt-2">
        <p className="p-4 text-secondary">Menu</p>
        <a href="#" className="border-1 p-4 text-primary text-lg">Dashboard</a>
        <a href="#">Calendar</a>
        <a href="#">Projects</a>
        <a href="#">Analytics</a>
      </div>

      <div className="flex flex-col">
        <p className="p-4 text-secondary">General</p>
        <a href="#">Settings</a>
      </div>
    </aside>
  );
}

export default SideBar