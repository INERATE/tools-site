import type { ToolSeo } from "./tool-seo";

/** Per-tool SEO copy — generated once, edit here to update a tool page meta title/description/keywords/FAQ. */
export const TOOL_SEO: Record<string, Omit<ToolSeo, "slug">> = {
  "pdf-merger": {
    "metaTitle": "Merge PDF Files Online Free & Private | Inerate Tools",
    "metaDescription": "Combine multiple PDF files into one document free online. Reorder, rotate, or delete pages before saving - private, in-browser, no upload, no signup.",
    "keywords": [
      "merge pdf",
      "combine pdf files",
      "pdf merger online free",
      "join pdf files online",
      "combine multiple pdf files into one free",
      "merge pdf without upload",
      "reorder pages while merging pdf",
      "free pdf combiner no signup"
    ],
    "h1": "Merge PDF Files, Privately",
    "faq": [
      {
        "q": "Is it safe to upload my PDF here?",
        "a": "Nothing is uploaded - your PDFs are combined entirely inside your browser, so the files never leave your device."
      },
      {
        "q": "Can I reorder or remove pages while merging?",
        "a": "Yes, after combining you can drag pages to reorder them, rotate any page, or drop pages you don't want before saving."
      },
      {
        "q": "Do I need to sign up or pay to merge PDFs?",
        "a": "No, the merger is completely free with no signup, account, or watermark on your output file."
      }
    ]
  },
  "pdf-split": {
    "metaTitle": "Split PDF Files Online Free | Inerate Tools",
    "metaDescription": "Split a PDF into separate files or extract pages free online. Pick pages visually or by range - no upload required, runs privately in your browser.",
    "keywords": [
      "split pdf",
      "pdf splitter online free",
      "extract pages from pdf",
      "separate pdf pages online",
      "split pdf by page range free",
      "pdf page extractor no upload",
      "divide pdf into multiple files"
    ],
    "h1": "Split a PDF in Seconds",
    "faq": [
      {
        "q": "How do I choose which pages to split out?",
        "a": "Select pages visually by clicking thumbnails or type a page range, then rearrange what's left before saving."
      },
      {
        "q": "Is my PDF uploaded to a server to split it?",
        "a": "No, splitting happens entirely in your browser, so your file is never sent to or stored on any server."
      },
      {
        "q": "Is the PDF splitter really free?",
        "a": "Yes, it's completely free to use with no signup and no limit on how many times you split a file."
      }
    ]
  },
  "rotate-pdf": {
    "metaTitle": "Rotate PDF Pages Online Free | Inerate Tools",
    "metaDescription": "Rotate PDF pages online free, one page or the whole file at once. Fix sideways scans instantly - no upload, no signup, private in-browser processing.",
    "keywords": [
      "rotate pdf",
      "rotate pdf pages online free",
      "fix sideways pdf",
      "rotate pdf page 90 degrees",
      "flip upside down pdf online",
      "rotate single page in pdf",
      "pdf rotator no upload"
    ],
    "h1": "Rotate PDF Pages Instantly",
    "faq": [
      {
        "q": "Can I rotate just one page instead of the whole PDF?",
        "a": "Yes, you can rotate individual pages one at a time or apply the same rotation to every page at once."
      },
      {
        "q": "Does rotating my PDF here require an upload?",
        "a": "No, the tool rotates pages directly in your browser, so your document never leaves your device."
      },
      {
        "q": "Why is my scanned PDF sideways or upside down?",
        "a": "Scanners often save pages in the wrong orientation; this tool lets you correct each page's rotation before saving."
      }
    ]
  },
  "sign-pdf": {
    "metaTitle": "Sign PDF Online Free - E-Sign Documents | Inerate Tools",
    "metaDescription": "Sign a PDF online free by drawing your signature and dragging it onto the page. No account, no upload - your document and signature never leave your browser.",
    "keywords": [
      "sign pdf",
      "e-sign pdf online free",
      "draw signature on pdf",
      "add signature to pdf online",
      "sign pdf document free no account",
      "electronic signature pdf no upload",
      "esign pdf online"
    ],
    "h1": "Sign a PDF, No Upload",
    "faq": [
      {
        "q": "Is my signature or document uploaded anywhere?",
        "a": "No, you draw your signature and place it on the page entirely in your browser, so nothing is ever sent to a server."
      },
      {
        "q": "Do I need an account to e-sign a PDF?",
        "a": "No, there's no signup or login required - open your PDF, sign it, and save."
      },
      {
        "q": "Can I reposition my signature after drawing it?",
        "a": "Yes, you can drag your signature to any spot on the page and resize it before saving the signed PDF."
      }
    ]
  },
  "page-numbers": {
    "metaTitle": "Add Page Numbers to PDF Online Free | Inerate Tools",
    "metaDescription": "Add page numbers to PDF online free, styled and positioned your way. Stamp every page instantly in your browser - no upload, no signup, completely private.",
    "keywords": [
      "add page numbers to pdf",
      "pdf page number online free",
      "insert page numbers pdf",
      "number pdf pages online",
      "add page numbers pdf no upload",
      "custom page number style pdf",
      "stamp page numbers on pdf free"
    ],
    "h1": "Add Page Numbers to Your PDF",
    "faq": [
      {
        "q": "Can I customize the position and style of the page numbers?",
        "a": "Yes, you can choose the position, font, and starting number before stamping them onto every page."
      },
      {
        "q": "Is my PDF sent to a server to add page numbers?",
        "a": "No, the numbers are stamped directly in your browser, so your file never gets uploaded anywhere."
      },
      {
        "q": "Is there a limit on how many pages I can number for free?",
        "a": "No, the tool is free with no page limit and no signup required."
      }
    ]
  },
  "watermark-remover": {
    "metaTitle": "Remove Watermark from PDF Online Free | Inerate Tools",
    "metaDescription": "Remove watermark from PDF online free - delete watermark annotations and cover printed marks. No upload, no signup, processed 100% privately in your browser.",
    "keywords": [
      "remove watermark from pdf",
      "pdf watermark remover online free",
      "delete watermark pdf",
      "remove stamp from pdf",
      "cover printed watermark pdf",
      "erase watermark pdf online no upload",
      "watermark eraser pdf free"
    ],
    "h1": "Remove Watermarks from a PDF",
    "faq": [
      {
        "q": "Can this remove watermarks printed directly into the page, not just annotations?",
        "a": "Yes, alongside deleting watermark and stamp annotations, you can cover marks that were printed into the page itself."
      },
      {
        "q": "Is my PDF uploaded to remove the watermark?",
        "a": "No, everything is processed locally in your browser, so your document is never uploaded to a server."
      },
      {
        "q": "Do I need to sign up to remove watermarks?",
        "a": "No, the tool is free to use with no account or signup needed."
      }
    ]
  },
  "pdf-to-image": {
    "metaTitle": "PDF to Image Converter Online Free | Inerate Tools",
    "metaDescription": "Convert PDF pages to PNG or JPG at any quality, right in your browser. No upload, no signup — pick your pages and export instantly, 100% private and free.",
    "keywords": [
      "pdf to image",
      "convert pdf to png",
      "pdf to jpg converter",
      "pdf pages to images online",
      "export pdf as images free",
      "pdf to png no upload",
      "convert pdf pages to jpg free",
      "pdf image converter online free"
    ],
    "h1": "Turn PDF Pages Into Images",
    "faq": [
      {
        "q": "Is it safe to upload my PDF here?",
        "a": "Nothing is uploaded — the PDF to Image tool runs entirely in your browser, so your file never touches a server."
      },
      {
        "q": "Can I choose which pages to convert?",
        "a": "Yes, you select exactly which pages you want before exporting them as PNG or JPG."
      },
      {
        "q": "Does it cost anything or require an account?",
        "a": "No, it's completely free with no signup, and you can export at any quality you choose."
      }
    ]
  },
  "docx-to-pdf": {
    "metaTitle": "DOCX to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Convert a Word document to a clean A4 PDF right in your browser, with a live preview before download. No upload, no signup — 100% private and free.",
    "keywords": [
      "docx to pdf",
      "convert word to pdf online",
      "word to pdf converter free",
      "docx to pdf no upload",
      "convert doc to pdf free online",
      "word document to pdf converter",
      "docx to pdf preview before download"
    ],
    "h1": "Word to PDF, Instantly",
    "faq": [
      {
        "q": "Will my document be uploaded to a server?",
        "a": "No, the conversion happens entirely in your browser — your DOCX file is never uploaded anywhere."
      },
      {
        "q": "Can I preview the PDF before downloading?",
        "a": "Yes, you see a full preview of the formatted A4 PDF before you save it."
      },
      {
        "q": "Is this DOCX to PDF converter really free?",
        "a": "Yes, it's 100% free with no signup or account required."
      }
    ]
  },
  "pdf-to-word": {
    "metaTitle": "PDF to Word Converter Online Free | Inerate Tools",
    "metaDescription": "Convert PDF to an editable Word document (.docx) free online. Extracts and rebuilds the text in your browser — no upload, no signup, 100% private and instant.",
    "keywords": [
      "pdf to word",
      "pdf to docx converter",
      "convert pdf to editable word document",
      "pdf to word online free",
      "pdf to word no upload",
      "extract text from pdf to word",
      "free pdf to word converter no signup"
    ],
    "h1": "PDF to Editable Word",
    "faq": [
      {
        "q": "Will the Word file keep my formatting?",
        "a": "The tool extracts the PDF's text and rebuilds it as a .docx, so basic structure carries over though complex layouts may need light cleanup."
      },
      {
        "q": "Is my PDF uploaded anywhere?",
        "a": "No, everything runs client-side in your browser — your file never leaves your device."
      },
      {
        "q": "Do I need to sign up to use it?",
        "a": "No signup is required, and the tool is completely free."
      }
    ]
  },
  "jpg-to-pdf": {
    "metaTitle": "JPG to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Turn JPG or PNG photos into one PDF file online, free. Arrange the page order yourself — everything processes in your browser, no upload, no signup needed.",
    "keywords": [
      "jpg to pdf",
      "convert images to pdf",
      "combine photos into one pdf",
      "jpg to pdf converter free online",
      "image to pdf no upload",
      "multiple jpg to one pdf free",
      "photo to pdf converter online"
    ],
    "h1": "Photos to One PDF",
    "faq": [
      {
        "q": "Can I combine multiple photos into a single PDF?",
        "a": "Yes, each image becomes one page in the order you set, all merged into a single PDF."
      },
      {
        "q": "Are my photos uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Is there a limit or cost to use this?",
        "a": "No, it's completely free with no signup required."
      }
    ]
  },
  "excel-to-pdf": {
    "metaTitle": "Excel to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Convert an Excel (.xlsx) sheet to a clean PDF grid, free online. Runs entirely in your browser — no upload, no signup, your spreadsheet stays private.",
    "keywords": [
      "excel to pdf",
      "convert xlsx to pdf",
      "excel spreadsheet to pdf online free",
      "xlsx to pdf converter no upload",
      "convert excel sheet to pdf free",
      "spreadsheet to pdf online",
      "excel to pdf no signup"
    ],
    "h1": "Excel Sheet to PDF",
    "faq": [
      {
        "q": "Does it convert every sheet in my workbook?",
        "a": "It reads the first sheet of your .xlsx file and lays it out as a PDF grid."
      },
      {
        "q": "Is my spreadsheet data safe?",
        "a": "Yes, the file never uploads anywhere — everything is processed locally in your browser."
      },
      {
        "q": "Is this Excel to PDF tool free to use?",
        "a": "Yes, completely free with no signup required."
      }
    ]
  },
  "pdf-to-powerpoint": {
    "metaTitle": "PDF to PowerPoint Converter Free Online | Inerate Tools",
    "metaDescription": "Convert PDF pages into PowerPoint slides, pixel-exact, free online. Each page becomes a full-bleed slide image in your browser — no upload, no signup.",
    "keywords": [
      "pdf to powerpoint",
      "pdf to ppt converter",
      "convert pdf to powerpoint slides online",
      "pdf to pptx free no upload",
      "turn pdf pages into slides",
      "pdf to ppt online free",
      "pixel exact pdf to powerpoint"
    ],
    "h1": "PDF Pages to Slides",
    "faq": [
      {
        "q": "Will the slides look exactly like my PDF?",
        "a": "Yes, each page is turned into a full-bleed slide image that's pixel-exact to the original."
      },
      {
        "q": "Is the PDF uploaded to a server for conversion?",
        "a": "No, the whole conversion runs locally in your browser — your file is never uploaded."
      },
      {
        "q": "Do I need an account to convert my file?",
        "a": "No, it's free to use with no signup needed."
      }
    ]
  },
  "html-to-pdf": {
    "metaTitle": "HTML to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Paste HTML markup and convert it to a clean A4 PDF, with a live preview before download. Runs in your browser — no upload, no signup, 100% private.",
    "keywords": [
      "html to pdf",
      "convert html to pdf online",
      "html to pdf converter free",
      "paste html generate pdf",
      "html to pdf no upload",
      "convert web page code to pdf",
      "free html to pdf converter no signup"
    ],
    "h1": "HTML to PDF, Instantly",
    "faq": [
      {
        "q": "Can I paste raw HTML code and get a PDF?",
        "a": "Yes, paste your HTML markup and it renders as a clean A4 PDF with a preview before download."
      },
      {
        "q": "Is my HTML content sent to a server?",
        "a": "No, the conversion happens entirely in your browser, so your markup never leaves your device."
      },
      {
        "q": "Is this tool free to use?",
        "a": "Yes, it's completely free with no signup required."
      }
    ]
  },
  "resume-builder": {
    "metaTitle": "Free Resume Builder Online (PDF) | Inerate Tools",
    "metaDescription": "Build a clean résumé by filling in a simple form and export it as a PDF, updating live as you type. No signup, no upload — 100% private in your browser.",
    "keywords": [
      "resume builder",
      "free resume builder online",
      "build resume pdf free",
      "resume maker no signup",
      "create resume online free",
      "resume builder pdf export",
      "cv builder online free no upload"
    ],
    "h1": "Build Your Résumé Free",
    "faq": [
      {
        "q": "Do I need to create an account to build my résumé?",
        "a": "No, there's no signup — just fill in the form and export your PDF."
      },
      {
        "q": "Is my resume data stored anywhere?",
        "a": "No, everything stays in your browser; nothing is uploaded or saved to a server."
      },
      {
        "q": "Can I see changes as I type?",
        "a": "Yes, the PDF preview updates live as you fill in the form."
      }
    ]
  },
  "pdf-to-markdown": {
    "metaTitle": "PDF to Markdown Converter Online Free | Inerate Tools",
    "metaDescription": "Extract text from a PDF and convert it to Markdown, free online. Headings are guessed from font size, right in your browser — no upload, no signup.",
    "keywords": [
      "pdf to markdown",
      "convert pdf to markdown online",
      "pdf to md converter free",
      "extract text from pdf to markdown",
      "pdf to markdown no upload",
      "convert pdf to md online free",
      "pdf text to markdown converter"
    ],
    "h1": "PDF to Markdown Text",
    "faq": [
      {
        "q": "How accurate is the heading detection?",
        "a": "Headings are guessed from font size in the PDF, so most documents convert cleanly though unusual layouts may need a quick check."
      },
      {
        "q": "Is my PDF file uploaded anywhere?",
        "a": "No, the extraction happens entirely in your browser — your file never leaves your device."
      },
      {
        "q": "Is this converter free?",
        "a": "Yes, completely free with no signup required."
      }
    ]
  },
  "markdown-to-pdf": {
    "metaTitle": "Markdown to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Paste markdown and convert it to a clean A4 PDF, with a live preview before download. Runs in your browser — no upload, no signup, 100% private.",
    "keywords": [
      "markdown to pdf",
      "convert markdown to pdf online",
      "md to pdf converter free",
      "paste markdown generate pdf",
      "markdown to pdf no upload",
      "convert md file to pdf free",
      "markdown to pdf converter no signup"
    ],
    "h1": "Markdown to PDF, Instantly",
    "faq": [
      {
        "q": "Can I paste raw markdown and get a formatted PDF?",
        "a": "Yes, paste your markdown and it renders as a clean A4 PDF with a preview before download."
      },
      {
        "q": "Is my markdown content uploaded to a server?",
        "a": "No, the conversion runs entirely in your browser, so your text never leaves your device."
      },
      {
        "q": "Is this markdown to pdf tool free?",
        "a": "Yes, it's completely free with no signup required."
      }
    ]
  },
  "compress-image": {
    "metaTitle": "Compress JPG & PNG Images Online Free | Inerate Tools",
    "metaDescription": "Compress JPG and PNG images online free, one file or a batch. 100% client-side: photos never leave your browser, no upload, no signup, instant results.",
    "keywords": [
      "compress image online",
      "compress jpg",
      "compress png",
      "reduce image file size free",
      "shrink photo for web",
      "batch image compressor online free",
      "compress image without losing quality",
      "compress multiple images at once"
    ],
    "h1": "Compress Images Online, Free",
    "faq": [
      {
        "q": "Is it safe to upload my photos to compress them here?",
        "a": "Nothing is uploaded — the compression runs entirely inside your browser, so your images never leave your device."
      },
      {
        "q": "Can I compress more than one image at a time?",
        "a": "Yes, you can batch-compress many JPGs or PNGs in one go, or compress a single file if that's all you need."
      },
      {
        "q": "Does this tool cost anything or require an account?",
        "a": "It's completely free with no signup — just open the page and start compressing."
      }
    ]
  },
  "resize-image": {
    "metaTitle": "Resize Photos Online Free - No Upload Needed | Inerate Tools",
    "metaDescription": "Resize photos online free by percentage, single or in batch. Processing runs 100% in your browser, no upload to any server, no signup, instant download.",
    "keywords": [
      "resize image online",
      "resize photo free",
      "scale image by percentage",
      "batch resize images online free",
      "shrink image dimensions",
      "resize multiple photos at once",
      "resize image without uploading",
      "photo resizer online"
    ],
    "h1": "Resize Photos, Free and Private",
    "faq": [
      {
        "q": "Where are my photos processed when I resize them?",
        "a": "Entirely on your device — the tool never uploads your files to a server, so nothing leaves your browser."
      },
      {
        "q": "Can I resize a batch of photos by the same percentage?",
        "a": "Yes, you can scale one photo or an entire batch down by the same percentage in a single step."
      },
      {
        "q": "Do I need to sign up to use the resizer?",
        "a": "No signup or account is needed; it's free to use directly in your browser."
      }
    ]
  },
  "convert-image": {
    "metaTitle": "Convert Image to JPG, PNG or WEBP Free | Inerate Tools",
    "metaDescription": "Convert images between JPG, PNG and WEBP free, right in your browser. No upload, no signup required, files stay 100% private and never touch a server.",
    "keywords": [
      "convert image online",
      "jpg to png converter",
      "png to webp converter free",
      "convert photo format online",
      "image format converter no upload",
      "convert jpg to webp",
      "free image converter online private"
    ],
    "h1": "Convert Images Between Formats",
    "faq": [
      {
        "q": "Is it safe to convert my images here, or do they get uploaded?",
        "a": "Your images are never uploaded — the format conversion happens entirely inside your browser."
      },
      {
        "q": "Which image formats can I convert between?",
        "a": "You can switch photos between JPG, PNG and WEBP, in either direction."
      },
      {
        "q": "Is the image converter really free with no signup?",
        "a": "Yes, it's completely free and requires no account or signup to use."
      }
    ]
  },
  "crop-image": {
    "metaTitle": "Crop Photo Online Free - No Upload Required | Inerate Tools",
    "metaDescription": "Crop photos online free with a live preview, trim the same margin off every image in one pass. 100% client-side, no upload, no signup, totally private.",
    "keywords": [
      "crop image online",
      "crop photo free",
      "batch crop images online free",
      "trim image margins",
      "crop multiple photos same size",
      "online photo cropper no upload",
      "crop image with preview"
    ],
    "h1": "Crop Photos with a Live Preview",
    "faq": [
      {
        "q": "Do my photos get uploaded to a server to crop them?",
        "a": "No, cropping happens entirely in your browser on your own device — nothing is ever uploaded."
      },
      {
        "q": "Can I crop the same margin off multiple photos at once?",
        "a": "Yes, you can set the crop live on a preview and apply the same trim across every photo."
      },
      {
        "q": "Is there a cost or signup to use the cropper?",
        "a": "It's free to use with no signup required."
      }
    ]
  },
  "watermark-image": {
    "metaTitle": "Add Watermark to Photos Online Free | Inerate Tools",
    "metaDescription": "Add a text watermark to your photos online free, tiled or placed once. Runs 100% in your browser, no upload, no signup, your images stay fully private.",
    "keywords": [
      "add watermark to image online",
      "text watermark photo free",
      "watermark multiple photos at once",
      "tiled watermark image online",
      "batch watermark images free",
      "watermark photo without uploading"
    ],
    "h1": "Watermark Your Photos, Free",
    "faq": [
      {
        "q": "Are my photos uploaded when I add a watermark?",
        "a": "No, the watermark is applied entirely inside your browser, so your photos never leave your device."
      },
      {
        "q": "Can the watermark be tiled across the whole image?",
        "a": "Yes, you can choose to tile the text watermark repeatedly or place it just once."
      },
      {
        "q": "Is watermarking photos here free?",
        "a": "Yes, it's free with no signup required."
      }
    ]
  },
  "remove-background": {
    "metaTitle": "Remove Background from Image Free | Inerate Tools",
    "metaDescription": "Remove image backgrounds online free with on-device AI segmentation. No upload to any server, no signup, your photos never leave your browser, instant results.",
    "keywords": [
      "remove background from image",
      "background remover online free",
      "remove image background no upload",
      "ai background remover private",
      "transparent background image free",
      "remove bg online no signup"
    ],
    "h1": "Remove Image Backgrounds, Free",
    "faq": [
      {
        "q": "Does this tool upload my photo to remove the background?",
        "a": "No, the subject is segmented from the background using on-device processing, entirely inside your browser."
      },
      {
        "q": "Is the background remover free to use?",
        "a": "Yes, it's completely free and requires no signup or account."
      },
      {
        "q": "Is it safe to use for private or sensitive photos?",
        "a": "Yes, since nothing is ever uploaded, your photos stay fully private on your own device."
      }
    ]
  },
  "extract-images": {
    "metaTitle": "Extract Images from PDF Online Free | Inerate Tools",
    "metaDescription": "Extract every embedded JPEG from a PDF at full quality as a .zip, free and 100% in your browser. No upload, no signup, your PDF never leaves your device.",
    "keywords": [
      "extract images from pdf",
      "pull images out of pdf free",
      "pdf image extractor online",
      "download pdf images as zip",
      "extract jpeg from pdf no upload",
      "get images out of pdf file free"
    ],
    "h1": "Extract Images from a PDF",
    "faq": [
      {
        "q": "Is my PDF uploaded to a server to extract the images?",
        "a": "No, the PDF is processed entirely in your browser and is never uploaded anywhere."
      },
      {
        "q": "What quality are the extracted images?",
        "a": "Every embedded JPEG is pulled out at its original full quality, with no recompression."
      },
      {
        "q": "How do I get the extracted images?",
        "a": "They're bundled into a single .zip file you can download instantly, for free with no signup."
      }
    ]
  },
  "ocr-pdf": {
    "metaTitle": "OCR PDF Online Free – Make Scanned Text Searchable",
    "metaDescription": "Turn scanned PDFs into searchable, selectable text with free OCR — 100% client-side, no upload, no signup. Extract and select text instantly in your browser.",
    "keywords": [
      "ocr pdf",
      "pdf ocr online",
      "make scanned pdf searchable",
      "convert scanned pdf to text",
      "pdf text recognition online",
      "extract text from scanned pdf free",
      "searchable pdf converter",
      "free ocr tool no signup"
    ],
    "h1": "Make Scanned PDFs Searchable",
    "faq": [
      {
        "q": "Is it safe to upload my scanned PDF here?",
        "a": "Your file never leaves your browser — OCR runs entirely on your device, so nothing is uploaded to any server."
      },
      {
        "q": "Does this cost anything or need an account?",
        "a": "No, OCR PDF is completely free and requires no signup or installation."
      },
      {
        "q": "What happens to the text after OCR?",
        "a": "The recognized text is embedded into the PDF as a selectable, searchable layer so you can copy, search, and select it like a normal document."
      }
    ]
  },
  "compress-pdf": {
    "metaTitle": "Compress PDF Online Free – Reduce PDF File Size",
    "metaDescription": "Shrink large scanned or image-heavy PDFs by re-encoding pages — free PDF compressor that runs 100% in your browser, no upload, no signup, instant results.",
    "keywords": [
      "compress pdf",
      "reduce pdf file size",
      "shrink pdf online free",
      "compress scanned pdf",
      "pdf compressor no upload",
      "reduce pdf size for email",
      "compress image heavy pdf",
      "free pdf size reducer"
    ],
    "h1": "Shrink Your PDF File Size",
    "faq": [
      {
        "q": "Will compressing reduce the quality of my PDF?",
        "a": "Pages are re-encoded to balance smaller file size with readable quality, so text and images stay clear for normal viewing and printing."
      },
      {
        "q": "Is my PDF uploaded to a server to compress it?",
        "a": "No, compression happens entirely on your device in the browser — your file is never uploaded anywhere."
      },
      {
        "q": "Is there a file size limit or cost?",
        "a": "The tool is free with no signup, and since everything runs locally the limit is only your device's own memory."
      }
    ]
  },
  "repair-pdf": {
    "metaTitle": "Repair PDF Online Free – Fix Corrupted PDF Files",
    "metaDescription": "Fix a damaged or corrupted PDF that won't open by rebuilding its internal structure — free repair tool that works entirely in your browser, no upload needed.",
    "keywords": [
      "repair pdf",
      "fix corrupted pdf",
      "pdf won't open fix",
      "repair damaged pdf file online",
      "rebuild broken pdf structure",
      "fix pdf file free",
      "corrupted pdf repair tool",
      "restore unreadable pdf"
    ],
    "h1": "Repair a Broken PDF File",
    "faq": [
      {
        "q": "Can this fix a PDF that won't open at all?",
        "a": "Yes, it rebuilds the PDF's internal structure to restore a valid, openable file for PDFs damaged by incomplete downloads or corruption."
      },
      {
        "q": "Is my damaged PDF sent anywhere to be repaired?",
        "a": "No, the repair process runs fully on-device in your browser, so the file never leaves your computer."
      },
      {
        "q": "Does repairing recover the original content?",
        "a": "It reconstructs the file structure so existing content becomes accessible again, though data in severely corrupted sections may not be recoverable."
      }
    ]
  },
  "crop-pdf": {
    "metaTitle": "Crop PDF Online Free – Trim Margins on Every Page",
    "metaDescription": "Trim the same margin off every page with a live preview — free PDF cropping tool that processes files 100% in your browser, no upload, no signup required.",
    "keywords": [
      "crop pdf",
      "trim pdf margins",
      "crop pdf pages online free",
      "remove white space pdf",
      "cut pdf page borders",
      "pdf margin trimmer",
      "crop pdf same size all pages",
      "resize pdf page online"
    ],
    "h1": "Crop PDF Margins Instantly",
    "faq": [
      {
        "q": "Can I preview the crop before applying it?",
        "a": "Yes, you set the crop live on a preview so you see exactly what will be trimmed before it's applied to every page."
      },
      {
        "q": "Does it crop all pages the same way?",
        "a": "Yes, the same margin is trimmed off every page in one pass, so your document stays consistent."
      },
      {
        "q": "Is the PDF uploaded to crop it?",
        "a": "No, cropping happens entirely in your browser — the file is never uploaded to any server."
      }
    ]
  },
  "redact-pdf": {
    "metaTitle": "Redact PDF Online Free – Permanently Remove Text",
    "metaDescription": "Draw a box over sensitive text to permanently delete it, not just cover it — free PDF redaction tool that runs 100% on-device, no upload, no signup needed.",
    "keywords": [
      "redact pdf",
      "remove sensitive text from pdf",
      "permanently black out pdf text",
      "pdf redaction tool free",
      "hide confidential information pdf",
      "redact pdf online no upload",
      "black out text in pdf",
      "secure pdf redaction"
    ],
    "h1": "Permanently Redact PDF Text",
    "faq": [
      {
        "q": "Does redacting just cover the text or actually remove it?",
        "a": "The text underneath the box is deleted from the file, not just visually covered, so it can't be recovered by copying or extracting."
      },
      {
        "q": "Is my sensitive document uploaded anywhere?",
        "a": "No, redaction happens entirely in your browser, so confidential content never leaves your device."
      },
      {
        "q": "Is this tool free to use?",
        "a": "Yes, it's completely free with no signup required."
      }
    ]
  },
  "pdf-forms": {
    "metaTitle": "PDF Form Filler Online Free – Fill Fields Fast",
    "metaDescription": "Fill in PDF text, checkbox, radio and dropdown fields directly in your browser — free, no upload, no signup, and your document never leaves your device.",
    "keywords": [
      "fill pdf form online",
      "pdf form filler free",
      "fill checkbox pdf online",
      "fill dropdown fields pdf",
      "complete pdf form no signup",
      "edit pdf form fields free",
      "pdf form filler no upload",
      "fill radio buttons pdf online"
    ],
    "h1": "Fill PDF Forms Instantly",
    "faq": [
      {
        "q": "What kinds of form fields can I fill?",
        "a": "You can fill text fields, checkboxes, radio buttons, and dropdown fields directly on the PDF."
      },
      {
        "q": "Is my form data uploaded to a server?",
        "a": "No, all filling happens locally in your browser, so your form data and document never leave your device."
      },
      {
        "q": "Do I need an account to fill a PDF form?",
        "a": "No, the tool is free to use with no signup required."
      }
    ]
  },
  "compare-pdf": {
    "metaTitle": "Compare PDF Files Online Free – See What Changed",
    "metaDescription": "Extract text from two PDFs and instantly see exactly what changed between versions — free comparison tool that runs 100% in your browser, no upload needed.",
    "keywords": [
      "compare pdf files",
      "pdf diff checker online",
      "compare two pdfs for changes",
      "pdf version comparison free",
      "find differences between pdfs",
      "pdf text comparison tool",
      "compare pdf documents online free",
      "detect changes in pdf"
    ],
    "h1": "Compare Two PDFs for Changes",
    "faq": [
      {
        "q": "What kind of changes does it detect?",
        "a": "It extracts the text from both PDFs and highlights exactly what was added, removed, or changed between the two versions."
      },
      {
        "q": "Are my documents uploaded to compare them?",
        "a": "No, comparison runs entirely in your browser — neither file is ever uploaded to a server."
      },
      {
        "q": "Is this free to use?",
        "a": "Yes, it's free with no signup required."
      }
    ]
  },
  "protect-pdf": {
    "metaTitle": "Protect PDF with Password Online Free | Inerate Tools",
    "metaDescription": "Encrypt your PDF with a real AES-256 password instantly in your browser. No upload, no signup — files never leave your device, 100% private and free.",
    "keywords": [
      "protect pdf",
      "password protect pdf online",
      "encrypt pdf free",
      "add password to pdf",
      "aes-256 pdf encryption",
      "secure pdf online no upload",
      "lock pdf with password free",
      "pdf password protect no signup"
    ],
    "h1": "Protect Your PDF with a Password",
    "faq": [
      {
        "q": "Is it safe to upload my PDF here?",
        "a": "Nothing is uploaded — the tool encrypts your PDF entirely inside your browser, so the file never leaves your device."
      },
      {
        "q": "What kind of password protection does it use?",
        "a": "It applies real AES-256 encryption, the same standard used by professional PDF software, not a fake or cosmetic lock."
      },
      {
        "q": "Do I need to sign up or pay to protect a PDF?",
        "a": "No account and no payment are required — the tool is completely free with no signup."
      }
    ]
  },
  "unlock-pdf": {
    "metaTitle": "Unlock PDF Password Online Free | Inerate Tools",
    "metaDescription": "Remove a known password from your PDF instantly in your browser. No upload, no signup, 100% private — decrypt files locally and download in seconds, free.",
    "keywords": [
      "unlock pdf",
      "remove pdf password",
      "unlock pdf online free",
      "decrypt pdf file",
      "remove password from pdf no upload",
      "pdf password remover free",
      "unlock protected pdf online",
      "open password protected pdf"
    ],
    "h1": "Unlock a Password-Protected PDF",
    "faq": [
      {
        "q": "Do I need to know the PDF's password to unlock it?",
        "a": "Yes — this tool removes protection from a PDF you already have the correct password for; it does not crack or bypass unknown passwords."
      },
      {
        "q": "Is my PDF uploaded to a server to remove the password?",
        "a": "No, the entire process runs locally in your browser, so the file and its password never leave your device."
      },
      {
        "q": "Is unlocking a PDF free and unlimited?",
        "a": "Yes, the tool is completely free to use with no signup or file limits."
      }
    ]
  },
  "flatten-forms": {
    "metaTitle": "Flatten PDF Form Fields Online Free",
    "metaDescription": "Convert fillable PDF form fields into permanent, uneditable page content instantly. No upload, no signup — processed 100% locally in your browser, free.",
    "keywords": [
      "flatten pdf form",
      "flatten pdf fields online",
      "make pdf form uneditable",
      "lock filled pdf form",
      "flatten fillable pdf free",
      "convert pdf form fields to text",
      "pdf form flattener no upload",
      "finalize pdf form online"
    ],
    "h1": "Flatten a Filled PDF Form",
    "faq": [
      {
        "q": "What does flattening a PDF form do?",
        "a": "It permanently merges the filled-in field values into the page itself, so the form can no longer be edited or refilled."
      },
      {
        "q": "Is my filled PDF form uploaded anywhere?",
        "a": "No, flattening happens entirely inside your browser, so your form data never leaves your device."
      },
      {
        "q": "Is this tool free to use?",
        "a": "Yes, flattening PDF forms is free with no signup required."
      }
    ]
  },
  "ai-summarizer": {
    "metaTitle": "AI PDF Summarizer Online – Summarize PDFs Instantly Free",
    "metaDescription": "Summarize any PDF instantly with AI. Your file never leaves your device — only the extracted text is sent for summarization. Free, no signup required.",
    "keywords": [
      "ai pdf summarizer",
      "summarize pdf online",
      "pdf summary generator",
      "free ai summarizer",
      "summarize pdf free",
      "ai text summarizer pdf",
      "summarize long pdf online",
      "pdf to summary ai tool"
    ],
    "h1": "Summarize Any PDF Instantly",
    "faq": [
      {
        "q": "Is my PDF uploaded to a server?",
        "a": "No — your PDF is opened and text-extracted locally in your browser. Only the extracted text, not the original file, is sent to the summarization service."
      },
      {
        "q": "Is the AI PDF summarizer free?",
        "a": "Yes, it's completely free to use with no signup or account required."
      },
      {
        "q": "Do I need to create an account to use it?",
        "a": "No — just choose a PDF and get an instant AI-generated summary, no signup needed."
      }
    ]
  },
  "smart-forms": {
    "metaTitle": "PDF to Fillable Form Converter Online – Free & Private",
    "metaDescription": "Turn any PDF into a fillable form instantly. Detects blank lines and checkboxes, adds real form fields — 100% private, browser-based, no upload, free, no signup",
    "keywords": [
      "pdf to fillable form",
      "convert pdf to fillable pdf online",
      "add form fields to pdf free",
      "pdf form creator online",
      "fillable pdf maker",
      "detect checkboxes pdf form",
      "free pdf form filler tool",
      "turn pdf into editable form"
    ],
    "h1": "Turn PDFs Into Fillable Forms",
    "faq": [
      {
        "q": "Is this PDF form tool safe to use with sensitive documents?",
        "a": "Yes — your PDF is processed entirely in your browser and is never uploaded to any server, so sensitive documents stay private."
      },
      {
        "q": "Is the PDF form converter free?",
        "a": "Yes, it's 100% free with no signup required."
      },
      {
        "q": "How does it detect form fields?",
        "a": "It automatically scans your PDF for blank lines and checkboxes and converts them into real, fillable form fields."
      }
    ]
  },
  "translate-pdf": {
    "metaTitle": "Translate PDF Online Free – Preserve Original Layout",
    "metaDescription": "Translate PDF instantly and rebuild it as a new PDF. Your original file stays on your device — only the extracted text is sent for translation. Free, no signup.",
    "keywords": [
      "translate pdf online",
      "pdf translator free",
      "translate pdf document online free",
      "translate pdf to another language",
      "pdf language translator tool",
      "translate pdf keep formatting",
      "free online pdf translation",
      "translate pdf without upload"
    ],
    "h1": "Translate Any PDF Instantly",
    "faq": [
      {
        "q": "Is my PDF file uploaded when I translate it?",
        "a": "No — your original PDF stays on your device; only the extracted text is sent to the translation service, then rebuilt into a new PDF."
      },
      {
        "q": "Is the PDF translator free to use?",
        "a": "Yes, it's completely free with no signup required."
      },
      {
        "q": "Will the translated file still be a PDF?",
        "a": "Yes — the translated text is rebuilt into a new PDF file that you can download instantly."
      }
    ]
  },
  "image-to-text": {
    "metaTitle": "Free Image to Text Converter (OCR) Online | Inerate Tools",
    "metaDescription": "Extract text from photos, screenshots and scans instantly with free OCR — 100% in your browser, no upload, no signup. Copy or download the result in seconds.",
    "keywords": [
      "image to text converter",
      "ocr online free",
      "jpg to text",
      "photo to text converter",
      "extract text from image",
      "screenshot to text",
      "scanned image to text",
      "convert image to text online no signup"
    ],
    "h1": "Turn Images Into Text",
    "faq": [
      {
        "q": "Is my image uploaded to a server?",
        "a": "No — the OCR runs entirely in your browser, so the image never leaves your device."
      },
      {
        "q": "What file types can I use?",
        "a": "You can use photos, screenshots or scanned pages — the tool reads the text straight out of the image in your browser."
      },
      {
        "q": "Is it free and do I need to sign up?",
        "a": "Yes, it's completely free with no signup required, and no image is ever uploaded to a server."
      }
    ]
  },
  "qr-code-generator": {
    "metaTitle": "Free QR Code Generator Online - Text to QR | Inerate Tools",
    "metaDescription": "Create a QR code from any text, link or contact info instantly — updates live as you type. 100% private, runs in your browser, free forever, no signup.",
    "keywords": [
      "qr code generator",
      "free qr code generator online",
      "create qr code from text",
      "url to qr code",
      "qr code for link free",
      "generate qr code no signup",
      "custom qr code maker",
      "text to qr code online"
    ],
    "h1": "Generate a QR Code Instantly",
    "faq": [
      {
        "q": "Is the QR code generator really free?",
        "a": "Yes, it's completely free to use with no signup and no limit on how many codes you create."
      },
      {
        "q": "Does my data get uploaded anywhere?",
        "a": "No — the QR code is generated entirely in your browser, so your text or link never touches a server."
      },
      {
        "q": "Can I use it for a URL, not just text?",
        "a": "Yes, just paste any link, text or contact info and the QR code updates live as you type."
      }
    ]
  },
  "word-counter": {
    "metaTitle": "Word Counter - Free Character Counter | Inerate Tools",
    "metaDescription": "Count words, characters, sentences and reading time live as you type — free, private and instant, with nothing ever uploaded to a server or saved online.",
    "keywords": [
      "word counter",
      "character counter online",
      "free word count tool",
      "sentence counter",
      "reading time calculator",
      "live word count",
      "character count online free",
      "word and character counter no signup"
    ],
    "h1": "Count Words in Real Time",
    "faq": [
      {
        "q": "Does the word counter save or upload my text?",
        "a": "No — everything is counted locally in your browser and nothing is ever sent to a server."
      },
      {
        "q": "What does it count besides words?",
        "a": "It also tracks characters, sentences and estimated reading time, all updating live as you type."
      },
      {
        "q": "Is there a limit or do I need an account?",
        "a": "No signup and no limit — it's free to use for any amount of text."
      }
    ]
  },
  "csv-to-pdf": {
    "metaTitle": "CSV to PDF Converter - Free Online Tool | Inerate Tools",
    "metaDescription": "Convert a CSV file into a clean, paginated PDF table in seconds — free, no signup, and processed entirely in your browser with no file ever uploaded.",
    "keywords": [
      "csv to pdf converter",
      "convert csv to pdf online free",
      "csv to pdf table",
      "export csv as pdf",
      "csv file to pdf no upload",
      "turn spreadsheet into pdf",
      "csv to pdf online tool",
      "paginated pdf from csv"
    ],
    "h1": "Convert CSV to PDF",
    "faq": [
      {
        "q": "Will my CSV data be uploaded anywhere?",
        "a": "No — the conversion happens entirely in your browser, so your file never leaves your device."
      },
      {
        "q": "Does it handle large CSV files?",
        "a": "It paginates the table automatically across pages, so multi-row CSV files stay readable in the PDF."
      },
      {
        "q": "Is it free to convert CSV files?",
        "a": "Yes, it's completely free with no signup required."
      }
    ]
  },
  "remove-blank-pages": {
    "metaTitle": "Remove Blank Pages From PDF Online Free | Inerate Tools",
    "metaDescription": "Automatically find and delete near-blank pages from a scanned PDF — free, private and instant, with your document processed in-browser, never uploaded.",
    "keywords": [
      "remove blank pages from pdf",
      "delete blank pages pdf online",
      "remove blank pages scanned pdf free",
      "blank page remover pdf",
      "clean up scanned pdf",
      "pdf blank page detector",
      "remove empty pages pdf",
      "free pdf blank page remover"
    ],
    "h1": "Remove Blank Pages From PDFs",
    "faq": [
      {
        "q": "How does it detect blank pages?",
        "a": "It scans each page for near-all-white content and flags the ones that are effectively blank for removal."
      },
      {
        "q": "Is my scanned PDF uploaded to a server?",
        "a": "No — the whole process runs locally in your browser, so the file never leaves your device."
      },
      {
        "q": "Is this tool free to use?",
        "a": "Yes, it's completely free with no signup needed."
      }
    ]
  },
  "pdf-metadata": {
    "metaTitle": "Edit PDF Metadata Online - Free & Private | Inerate Tools",
    "metaDescription": "Change a PDF's title, author, subject and keywords right in your browser — free, no signup, and the file is never uploaded to any server — guaranteed private.",
    "keywords": [
      "edit pdf metadata",
      "change pdf title and author",
      "pdf metadata editor online",
      "edit pdf properties free",
      "change pdf keywords",
      "pdf metadata editor no upload",
      "update pdf subject and author",
      "free pdf metadata tool"
    ],
    "h1": "Edit Your PDF's Metadata",
    "faq": [
      {
        "q": "What metadata can I edit?",
        "a": "You can change the PDF's title, author, subject and keywords directly in your browser."
      },
      {
        "q": "Is my PDF uploaded when I edit its metadata?",
        "a": "No — the edit happens entirely on your device, and the file is never sent to a server."
      },
      {
        "q": "Do I need to sign up to use this?",
        "a": "No, it's free with no signup or account required."
      }
    ]
  },
  "word-to-pdf": {
    "metaTitle": "Word to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Convert a Word document (.docx) to a clean A4 PDF right in your browser, with a live preview before download. No upload, no signup — 100% private and free.",
    "keywords": [
      "word to pdf",
      "convert word to pdf online free",
      "word document to pdf converter",
      "word to pdf no upload",
      "doc to pdf converter free",
      "word to pdf converter online",
      "word to pdf preview before download"
    ],
    "h1": "Word to PDF, Instantly",
    "faq": [
      {
        "q": "Will my document be uploaded to a server?",
        "a": "No, the conversion happens entirely in your browser — your Word file is never uploaded anywhere."
      },
      {
        "q": "Can I preview the PDF before downloading?",
        "a": "Yes, you see a full preview of the formatted A4 PDF before you save it."
      },
      {
        "q": "Is this Word to PDF converter really free?",
        "a": "Yes, it's 100% free with no signup or account required."
      }
    ]
  },
  "pdf-to-jpg": {
    "metaTitle": "PDF to JPG Converter Online Free | Inerate Tools",
    "metaDescription": "Convert PDF pages to JPG images at any quality, right in your browser. No upload, no signup — pick your pages and export instantly, 100% private and free.",
    "keywords": [
      "pdf to jpg",
      "pdf to jpg converter online free",
      "convert pdf to jpg",
      "pdf pages to jpg images",
      "export pdf as jpg free",
      "pdf to jpg no upload",
      "pdf to jpeg converter online"
    ],
    "h1": "Turn PDF Pages Into JPGs",
    "faq": [
      {
        "q": "Is it safe to upload my PDF here?",
        "a": "Nothing is uploaded — the PDF to JPG tool runs entirely in your browser, so your file never touches a server."
      },
      {
        "q": "Can I choose which pages to convert?",
        "a": "Yes, you select exactly which pages you want before exporting them as JPG."
      },
      {
        "q": "Does it cost anything or require an account?",
        "a": "No, it's completely free with no signup, and you can export at any quality you choose."
      }
    ]
  },
  "png-to-pdf": {
    "metaTitle": "PNG to PDF Converter Online Free | Inerate Tools",
    "metaDescription": "Turn PNG images into one PDF file online, free. Arrange the page order yourself — everything processes in your browser, no upload, no signup needed.",
    "keywords": [
      "png to pdf",
      "convert png to pdf",
      "png to pdf converter free online",
      "combine png images into one pdf",
      "png to pdf no upload",
      "multiple png to one pdf free",
      "image to pdf converter online"
    ],
    "h1": "PNGs to One PDF",
    "faq": [
      {
        "q": "Can I combine multiple PNG images into a single PDF?",
        "a": "Yes, each image becomes one page in the order you set, all merged into a single PDF."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Is there a limit or cost to use this?",
        "a": "No, it's completely free with no signup required."
      }
    ]
  },
  "pdf-to-text": {
    "metaTitle": "PDF to Text Converter Online Free | Inerate Tools",
    "metaDescription": "Extract all the text from a PDF and save it as a plain .txt file, free online. No upload, no signup — runs entirely in your browser, private and instant.",
    "keywords": [
      "pdf to text",
      "pdf to txt converter",
      "extract text from pdf online free",
      "convert pdf to text",
      "pdf to text no upload",
      "pdf text extractor free",
      "pdf to plain text online"
    ],
    "h1": "Extract Text From a PDF",
    "faq": [
      {
        "q": "Does this work on scanned PDFs?",
        "a": "It reads real, selectable text — for a scanned image PDF, use OCR PDF first to make the text selectable."
      },
      {
        "q": "Is my PDF uploaded anywhere?",
        "a": "No, extraction happens entirely in your browser, so your file never leaves your device."
      },
      {
        "q": "Do I need to sign up to use it?",
        "a": "No, it's completely free with no signup required."
      }
    ]
  },
  "png-to-jpg": {
    "metaTitle": "PNG to JPG Converter Online Free | Inerate Tools",
    "metaDescription": "Convert PNG images to JPG free online, in your browser. No upload, no signup — batch convert multiple images at once, 100% private.",
    "keywords": [
      "png to jpg",
      "png to jpg converter online free",
      "convert png to jpeg",
      "png to jpg no upload",
      "batch png to jpg converter",
      "png to jpg online free"
    ],
    "h1": "PNG to JPG, Instantly",
    "faq": [
      {
        "q": "Will converting to JPG lose transparency?",
        "a": "Yes — JPEG has no alpha channel, so any transparent areas in your PNG become solid."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Can I convert multiple PNGs at once?",
        "a": "Yes, drop as many as you like — you get a .zip back for a batch."
      }
    ]
  },
  "jpg-to-png": {
    "metaTitle": "JPG to PNG Converter Online Free | Inerate Tools",
    "metaDescription": "Convert JPG images to PNG free online, in your browser. No upload, no signup — batch convert multiple images at once, 100% private.",
    "keywords": [
      "jpg to png",
      "jpg to png converter online free",
      "convert jpeg to png",
      "jpg to png no upload",
      "batch jpg to png converter",
      "jpg to png online free"
    ],
    "h1": "JPG to PNG, Instantly",
    "faq": [
      {
        "q": "Is PNG output lossless?",
        "a": "Yes, PNG is a lossless format, so the pixel data is preserved exactly."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Can I convert multiple JPGs at once?",
        "a": "Yes, drop as many as you like — you get a .zip back for a batch."
      }
    ]
  },
  "remove-password-from-pdf": {
    "metaTitle": "Remove Password From PDF Online Free | Inerate Tools",
    "metaDescription": "Remove password protection from a PDF you already know the password for, free online. AES-256 and RC4 both supported — runs entirely in your browser, nothing uploaded.",
    "keywords": [
      "remove password from pdf",
      "pdf password remover online free",
      "delete pdf password",
      "unlock pdf password online",
      "remove pdf password no upload",
      "pdf password remover no signup"
    ],
    "h1": "Remove a PDF's Password",
    "faq": [
      {
        "q": "Do I need to know the current password?",
        "a": "Yes, you need the existing password to remove it — this tool decrypts a PDF you can already open, it doesn't crack unknown passwords."
      },
      {
        "q": "Is my PDF or password uploaded anywhere?",
        "a": "No, everything happens on-device in your browser, so your file and password never leave your device."
      },
      {
        "q": "What encryption does it support?",
        "a": "Both AES-256 and RC4, covering the PDF standard security handler used by virtually every password-protected PDF."
      }
    ]
  },
  "webp-to-png": {
    "metaTitle": "WEBP to PNG Converter Online Free | Inerate Tools",
    "metaDescription": "Convert WEBP images to PNG free online, in your browser. No upload, no signup — batch convert multiple images at once, 100% private.",
    "keywords": [
      "webp to png",
      "webp to png converter online free",
      "convert webp to png",
      "webp to png no upload",
      "batch webp to png converter",
      "webp to png online free"
    ],
    "h1": "WEBP to PNG, Instantly",
    "faq": [
      {
        "q": "Is PNG output lossless?",
        "a": "Yes, PNG is a lossless format, so the pixel data is preserved exactly."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Can I convert multiple WEBPs at once?",
        "a": "Yes, drop as many as you like — you get a .zip back for a batch."
      }
    ]
  },
  "png-to-webp": {
    "metaTitle": "PNG to WEBP Converter Online Free | Inerate Tools",
    "metaDescription": "Convert PNG images to WEBP free online, in your browser. Smaller files, same quality — no upload, no signup, batch convert at once.",
    "keywords": [
      "png to webp",
      "png to webp converter online free",
      "convert png to webp",
      "png to webp no upload",
      "batch png to webp converter",
      "png to webp online free"
    ],
    "h1": "PNG to WEBP, Instantly",
    "faq": [
      {
        "q": "Why convert to WEBP?",
        "a": "WEBP typically produces smaller files than PNG at similar quality, which helps page load speed."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Can I convert multiple PNGs at once?",
        "a": "Yes, drop as many as you like — you get a .zip back for a batch."
      }
    ]
  },
  "jpg-to-webp": {
    "metaTitle": "JPG to WEBP Converter Online Free | Inerate Tools",
    "metaDescription": "Convert JPG images to WEBP free online, in your browser. Smaller files, same quality — no upload, no signup, batch convert at once.",
    "keywords": [
      "jpg to webp",
      "jpg to webp converter online free",
      "convert jpg to webp",
      "jpg to webp no upload",
      "batch jpg to webp converter",
      "jpeg to webp online free"
    ],
    "h1": "JPG to WEBP, Instantly",
    "faq": [
      {
        "q": "Why convert to WEBP?",
        "a": "WEBP typically produces smaller files than JPG at similar quality, which helps page load speed."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Can I convert multiple JPGs at once?",
        "a": "Yes, drop as many as you like — you get a .zip back for a batch."
      }
    ]
  },
  "webp-to-jpg": {
    "metaTitle": "WEBP to JPG Converter Online Free | Inerate Tools",
    "metaDescription": "Convert WEBP images to JPG free online, in your browser. No upload, no signup — batch convert multiple images at once, 100% private.",
    "keywords": [
      "webp to jpg",
      "webp to jpg converter online free",
      "convert webp to jpeg",
      "webp to jpg no upload",
      "batch webp to jpg converter",
      "webp to jpg online free"
    ],
    "h1": "WEBP to JPG, Instantly",
    "faq": [
      {
        "q": "Why convert WEBP to JPG?",
        "a": "JPG has the widest compatibility across older apps and devices that don't support WEBP."
      },
      {
        "q": "Are my images uploaded to a server?",
        "a": "No, conversion happens entirely in your browser, so your images never leave your device."
      },
      {
        "q": "Can I convert multiple WEBPs at once?",
        "a": "Yes, drop as many as you like — you get a .zip back for a batch."
      }
    ]
  },
  "pdf-to-png": {
    "metaTitle": "PDF to PNG Converter Online Free | Inerate Tools",
    "metaDescription": "Convert PDF pages to PNG at any quality, right in your browser. No upload, no signup — pick your pages and export instantly, 100% private and free.",
    "keywords": [
      "pdf to png",
      "pdf to png converter online free",
      "convert pdf to png",
      "pdf pages to png images",
      "export pdf as png free",
      "pdf to png no upload"
    ],
    "h1": "Turn PDF Pages Into PNGs",
    "faq": [
      {
        "q": "Is it safe to upload my PDF here?",
        "a": "Nothing is uploaded — the PDF to PNG tool runs entirely in your browser, so your file never touches a server."
      },
      {
        "q": "Can I choose which pages to convert?",
        "a": "Yes, you select exactly which pages you want before exporting them as PNG."
      },
      {
        "q": "Does it cost anything or require an account?",
        "a": "No, it's completely free with no signup, and you can export at any quality you choose."
      }
    ]
  },
  "csv-to-excel": {
    "metaTitle": "CSV to Excel Converter Online Free | Inerate Tools",
    "metaDescription": "Convert a CSV file into a real .xlsx Excel workbook, free online. No upload, no signup — runs entirely in your browser, private and instant.",
    "keywords": [
      "csv to excel",
      "csv to xlsx converter",
      "convert csv to excel online free",
      "csv to excel no upload",
      "csv to spreadsheet converter",
      "free csv to xlsx converter"
    ],
    "h1": "CSV to a Real Excel File",
    "faq": [
      {
        "q": "Does the output open in Excel?",
        "a": "Yes, it's a real .xlsx workbook that opens in Excel, Google Sheets, or any spreadsheet app."
      },
      {
        "q": "Is my CSV uploaded anywhere?",
        "a": "No, the conversion happens entirely in your browser — your file never leaves your device."
      },
      {
        "q": "Do I need to sign up to use this?",
        "a": "No, it's free with no signup or account required."
      }
    ]
  },
  "excel-to-csv": {
    "metaTitle": "Excel to CSV Converter Online Free | Inerate Tools",
    "metaDescription": "Convert an Excel (.xlsx) sheet to plain .csv, free online. Runs entirely in your browser — no upload, no signup, your spreadsheet stays private.",
    "keywords": [
      "excel to csv",
      "xlsx to csv converter",
      "convert excel to csv online free",
      "excel to csv no upload",
      "spreadsheet to csv converter",
      "free xlsx to csv converter"
    ],
    "h1": "Excel to Plain CSV",
    "faq": [
      {
        "q": "Which sheet gets converted?",
        "a": "The first sheet in the workbook — other sheets are not included in the CSV."
      },
      {
        "q": "Is my workbook uploaded anywhere?",
        "a": "No, the conversion happens entirely in your browser — your file never leaves your device."
      },
      {
        "q": "Do I need to sign up to use this?",
        "a": "No, it's free with no signup or account required."
      }
    ]
  },
  "image-to-base64": {
    "metaTitle": "Image to Base64 Converter Online Free | Inerate Tools",
    "metaDescription": "Encode an image as a base64 data URI free online, ready to paste into CSS, HTML or JSON. No upload, no signup — runs entirely in your browser.",
    "keywords": [
      "image to base64",
      "image to base64 converter online free",
      "base64 encode image",
      "convert image to data uri",
      "image to base64 no upload",
      "png to base64 online"
    ],
    "h1": "Image to Base64",
    "faq": [
      {
        "q": "What can I do with the output?",
        "a": "Paste the data: URI straight into a CSS background-image, an HTML img src, or a JSON field — no separate image file needed."
      },
      {
        "q": "Is my image uploaded anywhere?",
        "a": "No, encoding happens entirely in your browser using the File API — your image never leaves your device."
      },
      {
        "q": "Is there a file size limit?",
        "a": "No hard limit, but base64 adds about 33% overhead, so very large images make for a very large string."
      }
    ]
  },
  "watermark-pdf": {
    "metaTitle": "Watermark PDF Online Free | Inerate Tools",
    "metaDescription": "Add a text watermark to a PDF online free, tiled diagonally or placed once. Runs 100% in your browser - no upload, no signup, your document stays private.",
    "keywords": [
      "watermark pdf online free",
      "add watermark to pdf",
      "stamp text on pdf",
      "confidential watermark pdf",
      "tiled watermark pdf online",
      "watermark pdf no upload"
    ],
    "h1": "Watermark Your PDF, Free",
    "faq": [
      {
        "q": "Can I control how the watermark looks?",
        "a": "Yes - choose the text, tile it diagonally across every page or place it once, and adjust its opacity."
      },
      {
        "q": "Is my PDF uploaded to a server?",
        "a": "No, the watermark is stamped entirely inside your browser using pdf-lib - your document never leaves your device."
      },
      {
        "q": "Does this work on password-protected PDFs?",
        "a": "No, remove the password first, then watermark it."
      }
    ]
  },
  "extract-pdf-pages": {
    "metaTitle": "Extract Pages from PDF Online Free | Inerate Tools",
    "metaDescription": "Extract specific pages from a PDF online free - type a range or pick pages visually, reorder what's left, then save. Runs entirely in your browser, no upload.",
    "keywords": [
      "extract pages from pdf",
      "extract pdf pages online free",
      "pull pages out of pdf",
      "save specific pdf pages",
      "pdf page extractor no upload"
    ],
    "h1": "Extract Pages from a PDF",
    "faq": [
      {
        "q": "How do I choose which pages to extract?",
        "a": "Type a page range like \"1-3, 5\", or click thumbnails on the board to keep just those pages."
      },
      {
        "q": "Can I reorder the extracted pages?",
        "a": "Yes, drag pages into any order on the board before saving."
      },
      {
        "q": "Is my PDF uploaded to a server?",
        "a": "No, pages are extracted entirely inside your browser - the file never leaves your device."
      }
    ]
  },
  "delete-pdf-pages": {
    "metaTitle": "Delete Pages from PDF Online Free | Inerate Tools",
    "metaDescription": "Delete pages from a PDF online free - type which pages to remove or click them off the board, then save. Runs entirely in your browser, nothing is uploaded.",
    "keywords": [
      "delete pages from pdf",
      "remove pages from pdf online free",
      "delete pdf page online",
      "remove pdf page no upload"
    ],
    "h1": "Delete Pages from a PDF",
    "faq": [
      {
        "q": "How do I choose which pages to delete?",
        "a": "Type the pages to remove like \"2, 4-5\", or click a page thumbnail on the board to drop it."
      },
      {
        "q": "Can I undo removing a page?",
        "a": "Yes, re-add the same PDF or adjust the range - nothing is saved until you click download."
      },
      {
        "q": "Is my PDF uploaded to a server?",
        "a": "No, pages are removed entirely inside your browser - the file never leaves your device."
      }
    ]
  }
};
