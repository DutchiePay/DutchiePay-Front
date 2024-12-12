export default function getTextLength(htmlContent) {
  const plainText = htmlContent.replace(/<\/?[^>]+(>|$)/g, '');
  return plainText.trim().length;
}
