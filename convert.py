#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

# Read products.html
input_file = os.path.join(os.path.dirname(__file__), 'pages', 'products.html')
output_file = os.path.join(os.path.dirname(__file__), 'index.html')

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all relative paths
content = content.replace('../css/', 'css/')
content = content.replace('../js/', 'js/')
content = content.replace('../images/', 'images/')
content = content.replace('href="../index.html"', 'href="index.html"')

# Update navigation links
content = content.replace('href="products.html" class="active"', 'href="index.html" class="active"')
content = content.replace('href="software.html"', 'href="pages/software.html"')
content = content.replace('href="applications.html"', 'href="pages/applications.html"')
content = content.replace('href="developer.html"', 'href="pages/developer.html"')
content = content.replace('href="media.html"', 'href="pages/media.html"')
content = content.replace('href="faq.html"', 'href="pages/faq.html"')
content = content.replace('href="contact.html"', 'href="pages/contact.html"')

# Update footer product links individually (more specific)
content = content.replace('href="products.html">Falcon K', 'href="index.html">Falcon K')
content = content.replace('href="products.html">Robin W', 'href="index.html">Robin W')
content = content.replace('href="products.html">Robin E1X', 'href="index.html">Robin E1X')
content = content.replace('href="products.html">Hummingbird HD1', 'href="index.html">Hummingbird HD1')
content = content.replace('href="products.html">Hummingbird HD1-R', 'href="index.html">Hummingbird HD1-R')

# Fix any remaining pages/ links
content = content.replace('href="pages/applications.html"', 'href="pages/applications.html"')
content = content.replace('href="pages/developer.html"', 'href="pages/developer.html"')
content = content.replace('href="pages/media.html"', 'href="pages/media.html"')

# Write to index.html
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('index.html created successfully')
