const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Page opening animation - two panels sliding apart */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Left panel */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-card origin-left animate-page-open-left" />
        {/* Right panel */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-card origin-right animate-page-open-right" />
      </div>
    </div>
  );
};

export default Index;
