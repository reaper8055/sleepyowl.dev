// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument('url_of_your_pdf.pdf');
loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    
    // Get total number of pages
    var numPages = pdf.numPages;

    // Loop through each page
    for (var pageNum = 1; pageNum <= numPages; pageNum++) {
        renderPage(pdf, pageNum);
    }
}, function (reason) {
    // PDF loading error
    console.error(reason);
});

function renderPage(pdf, pageNumber) {
    pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
        
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        // Create a new canvas element and add it to the document
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        document.body.appendChild(canvas);

        // Render PDF page into canvas context
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
            console.log('Page ' + pageNumber + ' rendered');
        });
    });
}
