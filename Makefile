
run:
	npm run dev


run-host:
	npm run dev -- --host


.PHONY: provision-web
provision-web:
	cd ../dk/site-deploy/ansible/ ; ansible-playbook -i ./hosts ./playbooks/coincidences_web.yml -u root


.PHONY: provision-web
provision-web:
	cd ../dk/site-deploy/ansible/ ; ansible-playbook -i ./hosts ./playbooks/coincidences_web_deploy.yml -u root

