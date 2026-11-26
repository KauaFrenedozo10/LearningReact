const PLACEHOLDER_SIZE = { width: 400, height: 300 };

/** Gera uma imagem ilustrativa (SVG) com a inicial do produto, para não depender de arquivos externos. */
function buildPlaceholder(name) {
  const initial = name.charAt(0).toUpperCase();
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PLACEHOLDER_SIZE.width}" height="${PLACEHOLDER_SIZE.height}">` +
    `<rect width="100%" height="100%" fill="#e9ecef"/>` +
    `<text x="50%" y="58%" font-size="120" text-anchor="middle" fill="#495057" font-family="sans-serif">${initial}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Imagem do produto com texto alternativo.
 * @param {{ product: Object, className?: string }} props - usa product.imagem se existir.
 */
export default function ProductImage({ product, className = "" }) {
  return (
    <img
      src={product.imagem || buildPlaceholder(product.nome)}
      alt={`Imagem ilustrativa de ${product.nome}`}
      width={PLACEHOLDER_SIZE.width}
      height={PLACEHOLDER_SIZE.height}
      className={`img-fluid ${className}`}
    />
  );
}
