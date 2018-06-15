import cloudinary from 'cloudinary'

var imgQuantityCheck = () => {
  var imageFiles = $('input[name=img]')
  if (imageFiles.length >= 3) {
    $('#upload_images_opener').remove()
  }
}

var legalesQuantityCheck = () => {
  var legales = $('input[name=legales]')
  if (legales.length >= 1) {
    $('#upload_legales_opener').remove()
  }
}

var cloudinaryKey = {
  cloud_name: 'eventizir',
  api_key: 644512573537437,
  upload_preset: 'qwhsyols',
  secure: true
}

var certificatUploader = (e) => {
  // cloudinary upload options
  cloudinaryKey.folder = 'certificats_documents'
  cloudinaryKey.field_name = 'photo[]'
  cloudinaryKey.max_files = 1

  // init upload
  cloudinary.openUploadWidget(cloudinaryKey, (err, res) => {
    if (err) {
      window.alert('Une erreur est survenue lors de l\'importation de votre fichier, merci de réessayer. Description de l\'erreur: ' + err)
    }
    if (res.length >= 1) {
      var certificat = res[0]

      // input file value to save action
      $('input[name=certificat_file]').val(certificat.secure_url)

      if ($('input[name=certificat_file]').val() !== certificat.secure_url) {
        e.preventDefault()
        window.alert('Une erreur est survenue, merci de réessayer.')
      } else {
        // change button openner
        $('#upload_certificats_opener')
          .removeClass('btn-danger')
          .addClass('btn-outline-dark')
        $('#upload_certificats_opener')[0].innerText = 'Changer mon document'

        // action in registration form
        if ($('#registration-form').length >= 1) {
          // change box style
          $('#other_participant_certificat_inerBox')
            .removeClass('alert-warning')
            .addClass('alert-light')

          // change button viewer
          $('#file_viewer')
            .attr('href', certificat.secure_url)
            .removeClass('hidde')
        } else {
          // action in user certificat form
          // change box style
          $('#certificat_innerBox')
            .removeClass('alert-warning')
            .addClass('alert-light')

          // change viewer button
          $('#file_viewer')
            .removeClass('hidde')
            .removeClass('btn-danger')
            .addClass('btn-warning')
            .attr('href', certificat.secure_url)
        }
      }
    }
  })
}

var imageUploader = (e) => {
  // cloudinary upload options
  cloudinaryKey.folder = 'events_images'
  cloudinaryKey.field_name = 'photo[]'
  cloudinaryKey.max_files = 1
  // init upload
  cloudinary.openUploadWidget(cloudinaryKey, (err, res) => {
    if (err) {
      window.alert('Une erreur est survenue lors de l\'importation de votre fichier, merci de réessayer. Description de l\'erreur: ' + err)
    }
    if (res.length >= 1) {
      var image = res[0]
      // input file value to save action
      $('#uploaded_images').append('<input name="img" value="' + image.secure_url + '" type="hidden">')
      // link to upload file
      $('#uploaded_images').append('<a href="' + image.secure_url + '" target="_blank" class="upload_image"><img class="img-thumbnail" src="' + image.thumbnail_url + '" alt="' + image.original_filename + '"></a>')
      // supéression du bouton si limite atteinte
      imgQuantityCheck()
    }
  })
}

var legalesUploader = (e) => {
  // cloudinary upload options
  cloudinaryKey.folder = 'legales_documents'
  cloudinaryKey.field_name = 'photo[]'
  cloudinaryKey.max_files = 1
  // init upload
  cloudinary.openUploadWidget(cloudinaryKey, (err, res) => {
    if (err) {
      window.alert('Une erreur est survenue lors de l\'importation de votre fichier, merci de réessayer. Description de l\'erreur: ' + err)
    }
    if (res.length >= 1) {
      var legales = res[0]
      // input file value to save action
      $('#uploaded_legales').append('<input name="legales" value="' + legales.secure_url + '" type="hidden">')
      // link to upload file
      $('#uploaded_legales').append('<a href="' + legales.secure_url + '" target="_blank" class="upload_legales"><img class="img-thumbnail" src="' + legales.thumbnail_url + '" alt="' + legales.original_filename + '"></a>')
      // supression du bouton si limite atteinte
      legalesQuantityCheck()
    }
  })
}

// Export trigger
var fileUploader = () => {
  // verify document limite
  imgQuantityCheck()
  legalesQuantityCheck()
  // certificat trigger
  $('#upload_certificats_opener').on('click', (e) => {
    certificatUploader(e)
  })
  $('#upload_images_opener').on('click', (e) => {
    imageUploader(e)
  })
  $('#upload_legales_opener').on('click', (e) => {
    legalesUploader(e)
  })
}

export default fileUploader()