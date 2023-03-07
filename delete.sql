-- delete from "Product" po where po.id in (select p.id from "Product" p where p."categoryId" in (select c.id from "Category" c where c."userId" = 'e0169bbc-89e3-40cd-b3d1-66786f62cff4'))

-- delete from "Category" ca where ca.id in (select c.id from "Category" c where c."userId" = 'e0169bbc-89e3-40cd-b3d1-66786f62cff4')