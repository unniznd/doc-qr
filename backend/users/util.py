from django.core.files.uploadedfile import InMemoryUploadedFile

import uuid
import uuid
import qrcode
from io import BytesIO

BASE_URL = "http://localhost:8000/"

def get_qr_token():
    qr_token = str(uuid.uuid4()).replace('-','')[:20]
    return qr_token


def get_qr_code(profile):
    qr_url = BASE_URL+"qr/"+profile.qr_token+"/"
    code = qrcode.QRCode()
    code.add_data(qr_url)
    code.make()
    img = code.make_image()
    thumb_io = BytesIO()
    img.save(thumb_io, format='JPEG')

    thumb_file = InMemoryUploadedFile(thumb_io, None, 'code.jpg', 'image/jpeg',
                                thumb_io.tell, None)
    
    return thumb_file
