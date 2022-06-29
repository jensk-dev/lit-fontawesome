import type { Icon, Text } from "@fortawesome/fontawesome-svg-core";

export interface Layerable {
  /**
   * Should return null when icon or text is not valid
   */
  getCompiled(): Text | Icon | null;
}
