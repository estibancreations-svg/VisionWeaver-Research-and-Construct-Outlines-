Original name: Kindle Interactive TOC Files for "Crossroads of Identity: Book One - Convergence".md
Drive ID: 1KV2Vr7SqWJO7oSUiV5HPlKkE98DkQo4G
Parent folder: My Drive/MAF/Master Book Audio Video Dump/
Modified: 2025-07-15T04:44:27.000Z

# Kindle Interactive TOC Files for "Crossroads of Identity: Book One - Convergence"

This package contains the necessary files to create a Kindle Interactive Table of Contents for your book.

## Files Included

### 1. toc.html
- **Purpose**: HTML Table of Contents page that appears in your book
- **Description**: A formatted page with clickable links to each chapter
- **Features**: 
  - Clean, readable formatting
  - Proper chapter numbering
  - Perspective indicators for each chapter
  - Kindle-compatible styling

### 2. toc.ncx
- **Purpose**: Navigation Control file for Kindle devices
- **Description**: XML file that creates the interactive menu on Kindle devices
- **Features**:
  - Proper NCX 2005-1 format
  - Sequential play order
  - Chapter navigation points
  - Metadata for book identification

### 3. content.opf
- **Purpose**: Open Packaging Format manifest file
- **Description**: Defines the book structure and metadata for Kindle
- **Features**:
  - Book metadata (title, author, description)
  - File manifest listing all content
  - Reading order (spine)
  - Navigation references

## Book Structure

The TOC includes the following chapters:

1. **Chapter 1**: The News (Marcus's Perspective)
2. **Chapter 2**: The Call (Jordan's Perspective)
3. **Chapter 3**: The Return (Desiree's Perspective)
4. **Chapter 4**: The Will (Marcus's Perspective)
5. **Chapter 5**: The House (Jordan's Perspective)
6. **Chapter 6**: The Memorial (Desiree's Perspective)
7. **Chapter 7**: The Decision (Marcus's Perspective)
8. **Chapter 8**: The Studio (Desiree's Perspective)
9. **Chapter 9**: The Crisis (Jordan's Perspective)
10. **Chapter 10**: The Threat (Marcus's Perspective)
11. **Chapter 11**: The Art (Desiree's Perspective)
12. **Chapter 12**: The Youth (Jordan's Perspective)
13. **Chapter 13**: The Offer (Marcus's Perspective)
14. **Chapter 14**: The Vision (Desiree's Perspective)
15. **Chapter 15**: The Choice (Alternating Perspectives)
16. **Epilogue**: The Letters

## Implementation Notes

### For Kindle Direct Publishing (KDP):
1. Include the `toc.html` file in your book's front matter
2. Upload the `toc.ncx` file as part of your book package
3. Use the `content.opf` as a reference for your book's manifest

### Chapter File References:
The TOC files reference individual chapter files (chapter1.html, chapter2.html, etc.). When creating your full book:
- Each chapter should be saved as a separate HTML file
- Use the exact filenames referenced in the TOC files
- Ensure each chapter file has the corresponding anchor ID (e.g., `id="chapter1"`)

### Kindle Create Integration:
If using Kindle Create:
1. Import your Word document
2. Replace the auto-generated TOC with the provided `toc.html`
3. Ensure chapter headings match the TOC structure

## Validation

Before publishing:
1. Test the TOC links in your ebook reader
2. Verify the interactive menu appears on Kindle devices
3. Check that all chapter references resolve correctly
4. Ensure the TOC appears in the book's navigation menu

## Author Information

- **Book**: Crossroads of Identity: Book One - Convergence
- **Author**: Steven Henry
- **Series**: The Crossroads of Identity Series
- **Genre**: LGBTQ+ Contemporary Fiction

## Technical Specifications

- **NCX Version**: 2005-1
- **HTML**: XHTML 1.0 compatible
- **Character Encoding**: UTF-8
- **Kindle Compatibility**: All Kindle devices and apps

