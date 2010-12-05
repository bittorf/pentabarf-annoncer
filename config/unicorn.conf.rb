# Minimal sample configuration file for Unicorn (not Rack) when used
# with daemonization (unicorn -D) started in your working directory.
#
# See http://unicorn.bogomips.org/Unicorn/Configurator.html for complete
# documentation.
# See also http://unicorn.bogomips.org/examples/unicorn.conf.rb for
# a more verbose configuration using more features.

listen 3000 # by default Unicorn listens on port 8080
listen "/tmp/.unicorn_sock", :backlog => 64

worker_processes 2 # this should be >= nr_cpus
timeout 30

pid "/home/announcer/app/shared/pids/unicorn.pid"
stderr_path "/home/announcer/app/shared/log/unicorn.log"
stdout_path "/home/announcer/app/shared/log/unicorn.log"
working_directory "/home/announcer/app/current"