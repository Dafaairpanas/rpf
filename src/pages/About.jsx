import { useTranslation } from "react-i18next";
import {
  HeroSection,
  StatsSection,
  CoreValuesSection,
  TimelineSection,
  ManagementSection,
} from "@/components/about";

/**
 * About Page - Thin Page Principle
 * All sections extracted to components, logic in hooks
 * 526 lines → ~30 lines (94% reduction)
 */
function About() {
  const { t } = useTranslation("about");

  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection t={t} />
      <StatsSection t={t} />
      <CoreValuesSection t={t} />
      <TimelineSection t={t} />
      <ManagementSection t={t} />
    </div>
  );
}

export default About;
