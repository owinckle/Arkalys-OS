from django.http import HttpResponse
from django.template.loader import get_template
from weasyprint import HTML, CSS

def generate_pdf(template_src, ctx):
	template = get_template(template_src)
	html		= template.render(ctx)
	pdf_file = HTML(string=html).write_pdf()
	response = HttpResponse(pdf_file, content_type='application/pdf')
	response['Content-Disposition'] = 'filename="home_page.pdf"'
	return response