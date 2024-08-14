
run:
	npm run dev -- --port 3000


run-host:
	npm run dev -- --host


.PHONY: provision
provision:
	cd ../dk/site-deploy/ansible/ ; ansible-playbook -i ./hosts ./playbooks/coincidences_web.yml -u root


.PHONY: deploy
deploy:
	cd ../dk/site-deploy/ansible/ ; ansible-playbook -i ./hosts ./playbooks/coincidences_web_deploy.yml -u root

