import re
data=""
with open(r'C:\Users\ECoop\OneDrive\Desktop\PYTHON_PROGRAMS\Evolve\src\sub-unminified.css','r')as c:
    data=c.read()
matchs=re.findall(r'\}(.*?)(?=\})',data,re.DOTALL)
# print(matchs)

# for i in range(5):
#     print(i,matchs[i].strip())
print(matchs[:5])
for i in range(len(matchs)):
    matchs[i]=matchs[i].split("{")


dark={
    'html-background': '#1f2424',
    'primary-border': '#ccc',
    'secondary-border': 'var(--theme-primary-border)',
    'primary-color': 'var(--theme-white)',
    'secondary-color': '#3a4344',

    'link': '#1abc9c',
    'link-hover': '#f2f2f2',
    'enabled': '#00af0f',
    'disabled': '#c20000',

    'has-text-advanced': '#00ac95',
    'has-text-alert': '#af5d00',
    'has-text-caution': '#ffa500',
    'has-text-danger': 'var(--theme-bulma-danger)',
    'has-text-fade': '#5e5e5e',
    'has-text-flair': 'var(--theme-has-text-special)',
    'has-text-label': '#ffff9e',
    'has-text-special': '#91006c',
    'has-text-info': 'var(--theme-bulma-info)',
    'has-text-success': 'var(--theme-bulma-success)',
    'has-text-warning': 'var(--theme-bulma-warning)',

    'popper': '#363636',
    'popper-has-text-label': '#1100ff',
    'popper-has-text-success': '#1c7e21',
    'popper-has-text-warning': '#776425',
    'modal-child-popper-background': '#f5f5f5',
    'modal-child-popper-border': 'var(--theme-black)',


    'tabs-li-is-active-link-border': 'var(--theme-link)',
    'tabs-li-is-active-link': 'var(--theme-link)',

    'button-background': '#282f2f',
    'button': 'var(--theme-primary-color)',
    'button-hover-background': 'var(--theme-secondary-color)',
    'button-hover': 'var(--theme-link-hover)',
    'button-focus-border': '#dbdbdb',

    'basic-button-border-hover-background': 'var(--theme-secondary-color)',
    'basic-button-border-hover': '#eee',

    'label': '#dbdee0',

    'checkbox-hover': 'var(--theme-link)',

    'dropdown-content-background': '#1f2424',

    'b-tooltip-accent': 'var(--theme-link-hover)',
    'b-tooltip-is-primary-background': 'var(--theme-b-tooltip-accent)',
    'b-tooltip-is-primary-border': '#f5f5f5',
    'b-tooltip-is-primary': 'var(--theme-black)',

    'bars-background': 'var(--theme-secondary-color)',

    'meter-low': '#cc0000',
    'meter-neutral': '#c0ce00',
    'meter-high': '#00af0f',

    'div-special-border': '#282f2f',
    'div-special-gear-fill': '#ad5f12',
    'div-special-hover-border': 'var(--theme-secondary-color)',
    'div-special-hover-gear-fill': '#d4af37',
    'span-on-border': '#282f2f',
    'span-on': 'var(--theme-enabled)',
    'span-on-warn': '#af5d00',
    'span-off-border': '#282f2f',
    'span-off': 'var(--theme-disabled)',
    'span-on-off-hover-border': 'var(--theme-secondary-color)',
    'hl-button-border': 'var(--theme-enabled)',
    'link-button-background': '#181818',
    'special-on-off-border': '#181818',
    'oldTech': 'var(--theme-primary-color)',
    'cnam-aTitle': '#975f5f',

    'fort-patrol-check-background': 'var(--theme-black)',

    'market-item-background': '#0f1414',
    'market-item-order-hover-background': 'var(--theme-secondary-color)',
    'market-item-order-hover-border': '#eee',

    'resource-overlay-color': 'hsl(from var(--theme-html-background) h s calc(l - 15))',
    'resource-overlay-color-alt': 'hsl(from var(--theme-market-item-background) h s calc(l - 15))',

    'modalBox-background': '#282f2f',

    'star-2-fill': 'var(--theme-white)',
    'star-3-fill': '#cd7f32',
    'star-4-fill': '#c0c0c0',
    'star-5-fill': '#d4af37',

    'webkit-scrollbar-background': 'var(--theme-html-background)',
    'webkit-scrollbar-thumb-background': '#F5F5F5',
}

print(matchs[:5],[re.findall(r'\n +.*?: var\(--theme-(.*?)\);',i[1],re.DOTALL) for i in matchs[:5]])
# print(len(dark.keys()),len(matchs))
for i in dark:
    dark[i]=[]
    for j in matchs:
        if len(j)!=2:
            # print(j)
            continue
        reg=re.findall(r'var\(--theme-(.*?)\)',j[1],re.DOTALL)
        if len(reg)==0:
            # print(reg,j,i)
            continue
        if reg[0]==i:
            print(j,i)
            dark[i].append(j[0])
# print(dark)
s="{\n"
for i in dark:
    s+=f"\"{i}\": {dark[i]},\n"
s=s[:-2].replace("'","\"")+"\n}"
with open("./sub-dat.json","w")as sd:
    sd.write(s)
print("done")