import { buildStructuredDataJson } from '../../utils/seoStructuredDataUtil';

/**
 * Injects JSON-LD structured data for crawlers that execute JavaScript.
 */
export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: buildStructuredDataJson() }}
    />
  );
}
