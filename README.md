# Spelwerk API

## URL Routes

- /attribute/
- /attributetype/
- /character/
- /module/
- /manifestation/
- /perk/
- /perktype/
- /person/
- /socialstatus/
- /species/
- /user/

## Global Routes

### GET

All URL headers will respond to GET requests. You can either GET a list of all objects, or single objects with the use of :id.

###### Example:

- GET: http://localhost/attribute
- GET: http://localhost/attribute/1

### POST

All POST requests will have the key and valuetype information below.

### PUT

All PUT requests that are available will use the key and valuetype from the corresponding route POST request.

### DELETE

All URL routes will delete on DELETE requests.

###### Example:

- DELETE: http://localhost/attribute/1

## Specific Routes

Listing all specific requests you can do with a header.

###### Example:

- key (valuetype)


### /attribute

#### POST /attribute

- attributetype (fk)
- name (varchar)
- description (text)
- manifestation (fk)

##### PUT /attribute/:id/name
##### PUT /attribute/:id/description



### /attributetype

#### POST /attributetype

- name (varchar)
- maximum (int)

maximum stands for the maximum level of an attribute with the type.

##### PUT /attributetype/:id/name
##### PUT /attributetype/:id/maximum



### /character

#### POST /character

- personid (fk)
- age (int)
- nature (varchar)
- identity (varchar)
- manifestation (fk)
- socialstatus (fk)

##### PUT /character/:id/age
##### PUT /character/:id/nature
##### PUT /character/:id/identity
##### PUT /character/:id/manifestation
##### PUT /character/:id/socialstatus
##### PUT /character/:id/firstname
##### PUT /character/:id/lastname
##### PUT /character/:id/nickname
##### PUT /character/:id/gender
##### PUT /character/:id/occupation
##### PUT /character/:id/description



### /module

#### POST /module

- name (varchar)
- description (text)

##### PUT /module/:id/name
##### PUT /module/:id/description



### /manifestation

#### POST /manifestation

- name (varchar)
- description (text)

##### PUT /manifestation/:id/name
##### PUT /module/:id/description



### /perk

#### POST /perk

- perktype (fk)
- name (varchar)
- description (text)
- maximum (int)
- special (tinyint(1))
- skill (fk)
- synergy (fk)
- give_attribute (fk)
- req_perk (fk)
- req_species (fk)

##### PUT /perk/:id/name
##### PUT /perk/:id/description
##### PUT /perk/:id/maximum
##### PUT /perk/:id/special
##### PUT /perk/:id/skill
##### PUT /perk/:id/synergy
##### PUT /perk/:id/giveattribute
##### PUT /perk/:id/reqperk
##### PUT /perk/:id/reqspecies



### POST /person

- firstname (varchar)
- lastname (varchar)
- gender (varchar)
- occupation (varchar)
- description (text)
- module (fk)
- species (fk)

##### PUT /person/:id/firstname
##### PUT /person/:id/lastname
##### PUT /person/:id/gender
##### PUT /person/:id/occupation
##### PUT /person/:id/description



### POST /socialstatus

- name (varchar)
- description (text)
- finance (int)

##### PUT /socialstatus/:id/name
##### PUT /socialstatus/:id/description
##### PUT /socialstatus/:id/finance



### POST /species

- name (varchar)
- description (text)

##### PUT /species/:id/name
##### PUT /species/:id/description



### POST /user

- email (varchar)
- password (varchar)
- firstname (varchar)
- lastname (varchar)

##### PUT /user/:id/email
##### PUT /user/:id/password
##### PUT /user/:id/firstname
##### PUT /user/:id/lastname
