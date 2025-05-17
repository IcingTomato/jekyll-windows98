@echo off
setlocal enabledelayedexpansion

:: Remove old tag directories
if exist tags rd /s /q tags
mkdir tags

:: Get tags from _posts directory
for %%f in (_posts\*.md _posts\*.markdown) do (
    for /f "tokens=*" %%l in ('findstr /C:"tags: " %%f') do (
        set tags=%%l
        set tags=!tags:tags: [=!
        set tags=!tags:]=!
        
        :: Process each tag
        for %%t in (!tags!) do (
            set tag=%%t
            set tag=!tag:,=!
            set tag=!tag:"=!
            set tag=!tag:'=!
            set tag=!tag: =!
            
            :: Convert tag to lowercase
            set "tag_lower=!tag!"
            set "tag_lower=!tag_lower:A=a!"
            set "tag_lower=!tag_lower:B=b!"
            set "tag_lower=!tag_lower:C=c!"
            set "tag_lower=!tag_lower:D=d!"
            set "tag_lower=!tag_lower:E=e!"
            set "tag_lower=!tag_lower:F=f!"
            set "tag_lower=!tag_lower:G=g!"
            set "tag_lower=!tag_lower:H=h!"
            set "tag_lower=!tag_lower:I=i!"
            set "tag_lower=!tag_lower:J=j!"
            set "tag_lower=!tag_lower:K=k!"
            set "tag_lower=!tag_lower:L=l!"
            set "tag_lower=!tag_lower:M=m!"
            set "tag_lower=!tag_lower:N=n!"
            set "tag_lower=!tag_lower:O=o!"
            set "tag_lower=!tag_lower:P=p!"
            set "tag_lower=!tag_lower:Q=q!"
            set "tag_lower=!tag_lower:R=r!"
            set "tag_lower=!tag_lower:S=s!"
            set "tag_lower=!tag_lower:T=t!"
            set "tag_lower=!tag_lower:U=u!"
            set "tag_lower=!tag_lower:V=v!"
            set "tag_lower=!tag_lower:W=w!"
            set "tag_lower=!tag_lower:X=x!"
            set "tag_lower=!tag_lower:Y=y!"
            set "tag_lower=!tag_lower:Z=z!"
            
            :: Create tag directory
            if not exist tags\!tag_lower! mkdir tags\!tag_lower!
            
            :: Create index.html file
            echo --->> tags\!tag_lower!\index.html
            echo layout: tag>> tags\!tag_lower!\index.html
            echo tag: !tag!>> tags\!tag_lower!\index.html
            echo --->> tags\!tag_lower!\index.html
        )
    )
)

echo Tag pages generation completed!