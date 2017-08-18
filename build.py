#!/usr/bin/env python3

import sys
import toml
from random import randint

import jinja2
from bs4 import BeautifulSoup


def main(args):
    with open('site.toml') as f:
        config = toml.loads(f.read())

    loader = jinja2.FileSystemLoader('templates')
    env = jinja2.Environment(loader=loader)

    normalize_config(config)

    for page_name, page_config in config['pages'].items():
        build_page(page_name, page_config, env, config)


def build_page(page_name, page_config, env, config):
    try:
        template = env.get_template('{}.html'.format(page_name))
    except jinja2.exceptions.TemplateSyntaxError as err:
        print(err, err.lineno)
        sys.exit(1)

    with open('out/{}.html'.format(page_name), 'w') as f:
        soup = BeautifulSoup(template.render(**config, page=page_config), 'html.parser')
        f.write(soup.prettify(formatter='html'))


def schedule_message(jump_name):
    if jump_name[0].lower() in 'aeiou':
        article = 'an'
    else:
        article = 'a'
    return 'schedule {} {}!'.format(article, jump_name).upper()


def about_slider_images(images):
    new_images = []
    for index, image in enumerate(images):
        new_image = {
            'url': image,
            'z_index': index,
            'rotate': '{}deg'.format(randint(-15, 15))
        }

        new_images.append(new_image)

    return new_images


def normalize_config(config):
    config['link']['footer'] = config['link']['header'] + config['link']['footer']
    for page in config['pages'].values():
        if page.get('title', False):
            page['title'] += ' | ' + config['club']['name']
        else:
            page['title'] = config['club']['name']

    for jump in config['pages']['first-time']['jump_types']:
        jump['schedule_message'] = schedule_message(jump['name'])

    config['pages']['about']['slider_images'] = about_slider_images(config['pages']['about']['slider_images'])


if __name__ == '__main__':
    main(sys.argv)
