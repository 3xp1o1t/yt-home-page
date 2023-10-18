import { useState } from 'react';
import CategoryPills from './components/category-pills';
import VideoGridItem from './components/video-grid-item';
import { SidebarProvider } from './context/sidebar-context';
import { categories, videos } from './data/home';
import PageHeader from './layout/page-header';
import { Sidebar } from './layout/sidebar';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
            D S
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
