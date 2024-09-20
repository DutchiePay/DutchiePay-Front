import '@/styles/globals.css';
import '@/styles/commerce.css';
import '@/styles/community.css';

import SectionSearch from '@/app/_components/SectionSearch';

export async function generateStaticParams() {
  const sections = [1, 2, 3]; // 추후 데이터 API

  return sections.map((section) => ({
    section: section.toString(),
  }));
}

export default function SearchSection() {
  <SectionSearch />;
}
