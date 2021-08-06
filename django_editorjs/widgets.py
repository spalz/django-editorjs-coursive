import json
from django.forms import widgets, Media
from django.template.loader import render_to_string


class EditorJsWidget(widgets.Textarea):
    def __init__(self, editorjs_config, *args, **kwargs):
        super(EditorJsWidget, self).__init__(*args, **kwargs)
        self._editorjs_config = editorjs_config

    @property
    def media(self):
        return Media(
            css={"all": ["django-editorjs.css"]},
            js=(
                "https://cdn.jsdelivr.net/combine/npm/@editorjs/editorjs@2.22.2,npm/@editorjs/paragraph@2.8.0,npm/@editorjs/image@2.6.0,npm/@editorjs/header@2.6.1,npm/@editorjs/list@1.6.2,npm/@editorjs/quote@2.4.0,npm/@editorjs/embed@2.4.6,npm/@editorjs/marker@1.2.2,npm/@editorjs/attaches@1.1.0,npm/editorjs-hyperlink@1.0.6",
                "https://cdn.jsdelivr.net/gh/spalz/editorjs-alert-coursive@1.0.4/dist/bundle.js",
                "https://cdn.jsdelivr.net/gh/spalz/editorjs-alert-coursive-achievement/dist/bundle.js",
                "https://cdn.jsdelivr.net/gh/spalz/editorjs-comparison/dist/bundle.js",
                "https://cdn.jsdelivr.net/gh/spalz/editorjs-dialog-selector/dist/bundle.js",
                "https://cdn.jsdelivr.net/gh/spalz/editorjs-attaches-audio/dist/bundle.js ",
                "https://cdn.jsdelivr.net/gh/mr8bit/carousel-editorjs/dist/bundle.js ",
                "django-editorjs.js",
            ),
        )

    def render(self, name, value, **kwargs):
        ctx = {
            "name": name,
            "id": kwargs["attrs"]["id"],
            "value": value,
            "editorjs_config": json.dumps(self._editorjs_config),
        }
        return render_to_string("editorjs.html", ctx)
