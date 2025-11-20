export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-heading text-xl font-bold">Santosh Kumar</span>
          </a>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {/* Navigation items will be added here */}
        </nav>
      </div>
    </header>
  );
}

