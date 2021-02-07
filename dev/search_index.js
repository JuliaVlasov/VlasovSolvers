var documenterSearchIndex = {"docs":
[{"location":"vlasov-poisson/#Vlasov-Poisson","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"","category":"section"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"We consider the dimensionless Vlasov-Poisson equation for one species with a neutralizing background.","category":"page"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"fracpartial fpartial t+ vcdot nabla_x f + E(tx) cdot nabla_v f = 0","category":"page"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"- Delta phi = 1 - rho E = - nabla phi","category":"page"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"rho(tx)  =  int f(txv)dv","category":"page"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"Vlasov Equation - Wikipedia","category":"page"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"using Plots","category":"page"},{"location":"vlasov-poisson/#Input-parameters","page":"Vlasov-Poisson","title":"Input parameters","text":"","category":"section"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"using VlasovSolvers\n\ndev = CPU()                  # device\nnx, nv = 64, 64              # grid resolution\nstepper = StrangSplitting()  # timestepper\ndt = 0.1                     # timestep\nnsteps = 1000                # total number of time-steps\n\nxmin, xmax = 0, 4π           # X Domain length (m)\nvmin, vmax = -6, 6           # V Domain length (m)\nα  = 0.001                   # Perturbation amplitude\nkx = 0.5                     # Wave number of perturbation","category":"page"},{"location":"vlasov-poisson/#Simulation","page":"Vlasov-Poisson","title":"Simulation","text":"","category":"section"},{"location":"vlasov-poisson/","page":"Vlasov-Poisson","title":"Vlasov-Poisson","text":"xgrid = OneDGrid(dev, nx, xmin, xmax)\nvgrid = OneDGrid(dev, nv, vmin, vmax)\n\nf = DistributionFunction( xgrid, vgrid )\n\nlandau!(f, α, kx)\n\nprob = VlasovProblem(f, BSLSpline(5), dev)\n\nsol = solve!(prob, stepper, dt, nsteps )\n\nt = LinRange(0,100,1000)\n\nplot( t, sol; label = \"E\")\nplot!(t, -0.1533*t.-5.50; label=\"-0.1533t.-5.5\")","category":"page"},{"location":"tsi/#Two-stream-instability","page":"Two-stream instability","title":"Two-stream instability","text":"","category":"section"},{"location":"tsi/","page":"Two-stream instability","title":"Two-stream instability","text":"using Plots, Statistics, FFTW, LinearAlgebra\nusing ProgressMeter\nusing VlasovSolvers","category":"page"},{"location":"tsi/","page":"Two-stream instability","title":"Two-stream instability","text":"dev = CPU()                  # device\nnx, nv = 320, 64             # grid resolution\nstepper = StrangSplitting()  # timestepper\ndt = 0.1                     # timestep\nnsteps = 1000                # total number of time-steps\n\nxmin, xmax = 0, 20π          # X Domain length (m)\nvmin, vmax = -8, 8           # V Domain length (m)\n\nxgrid = OneDGrid(dev, nx, xmin, xmax)\nvgrid = OneDGrid(dev, nv, vmin, vmax)\n\ndf = DistributionFunction( xgrid, vgrid )\n\ncontour(vgrid.points, xgrid.points, df.values)","category":"page"},{"location":"tsi/","page":"Two-stream instability","title":"Two-stream instability","text":"\"\"\"\n    compute_e(f)\n\ncompute Ex using that -ik*Ex = rho \n\"\"\"\nfunction compute_e( f )\n\n   dv = f.vgrid.step\n   rho = dv * sum(real(f.values), dims=2)\n   rho = vec(rho .- mean(rho))\n   nx = f.xgrid.len\n   xmin = f.xgrid.start\n   xmax = f.xgrid.stop\n   kx =  2π / (xmax - xmin)\n   modes = zeros(Float64, nx)\n   modes .= kx * vcat(0:div(nx,2)-1,-div(nx,2):-1)\n   modes[1] = 1.0\n   rhok = fft(rho) ./ modes\n   rhok .*= -1im\n   ifft!(rhok)\n   real(rhok)\n\nend\n\nimport VlasovSolvers: advection!\n\ntwo_stream_instability!(df)\n\nf = copy(df.values)\nfᵗ = transpose(f) |> collect\n\nex = compute_e(df)\n\nadvection!(fᵗ, vgrid, ex, 0.5dt)\n\ndt = 0.005     # Time step\nnt = 10000\nv = collect(vgrid.points)\n\nanim = @animate for it in 1:nt\n\n    advection!(f, xgrid, v, dt)\n    df.values .= f\n    ex = compute_e( df )\n    transpose!(fᵗ, f)\n    advection!(fᵗ, vgrid, ex, dt)\n    transpose!(f, fᵗ)\n    contourf(vgrid.points, xgrid.points, f, clims=(0,5))\n\nend every 100\n\ngif(anim, \"assets/tsi.gif\", fps = 15) # hide\nnothing # hide","category":"page"},{"location":"tsi/","page":"Two-stream instability","title":"Two-stream instability","text":"(Image: rotation)","category":"page"},{"location":"contents/#Contents","page":"Contents","title":"Contents","text":"","category":"section"},{"location":"contents/","page":"Contents","title":"Contents","text":"","category":"page"},{"location":"contents/#Index","page":"Contents","title":"Index","text":"","category":"section"},{"location":"contents/","page":"Contents","title":"Contents","text":"","category":"page"},{"location":"vlasov-ampere/#Vlasov–Ampere","page":"Vlasov-Ampere","title":"Vlasov–Ampere","text":"","category":"section"},{"location":"vlasov-ampere/","page":"Vlasov-Ampere","title":"Vlasov-Ampere","text":"fracpartial fpartial t + upsilon fracpartial fpartial x\n- E(tx) fracpartial fpartial upsilon = 0","category":"page"},{"location":"vlasov-ampere/","page":"Vlasov-Ampere","title":"Vlasov-Ampere","text":"fracpartial Epartial t = - J = int fupsilon  dupsilon","category":"page"},{"location":"vlasov-ampere/#Algorithm","page":"Vlasov-Ampere","title":"Algorithm","text":"","category":"section"},{"location":"vlasov-ampere/","page":"Vlasov-Ampere","title":"Vlasov-Ampere","text":"For each j compute discrete Fourier transform in x of f^n(x_iupsilon_j) yielding f_k^n(upsilon_j), \nFor $ k \\neq 0 $\nCompute \nf^n+1_k(upsilon_j) = e^2ipi k upsilon Delta tL f_n^k(upsilon_j)\nCompute \nrho_k^n+1 = Delta upsilon sum_j f^n+1_k(upsilon_j)\nCompute\nE^n+1_k = rho^n+1_k L(2ipi k epsilon_0)\nFor k = 0 do nothing: \nf_n+1(upsilon_j) = f^n_k(upsilon_j) E^n+1_k = E^n_k.\nPerform inverse discrete Fourier transform of E^n+1_k and for each j of f^n+1_k (upsilon_j).","category":"page"},{"location":"vlasov-ampere/","page":"Vlasov-Ampere","title":"Vlasov-Ampere","text":"using Plots\nusing VlasovSolvers\n\ndev = CPU()                  # device\nnx, nv = 256, 256            # grid resolution\nstepper = StrangSplitting()  # timestepper\ndt = 0.01                    # timestep\nnsteps = 10                  # total number of time-steps\n\nxmin, xmax = 0, 4π           # X Domain length (m)\nvmin, vmax = -6, 6           # V Domain length (m)\nα  = 0.001                   # Perturbation amplitude\nkx = 0.5                     # Wave number of perturbation\n\nxgrid = OneDGrid(dev, nx, xmin, xmax)\nvgrid = OneDGrid(dev, nv, vmin, vmax)\n\nf = DistributionFunction( xgrid, vgrid )\n\nlandau!(f, α, kx)\n\nprob = VlasovProblem(f, Fourier(xgrid, vgrid), dev)\n\nnsteps = 600\ndt = 0.1\n\nsol = solve!(prob, stepper, dt, nsteps )\n\nt =  range(0,stop=60,length=nsteps)\n\nplot(t, -0.1533*t.-5.48)\nplot!(t, sol, label=\"ampere\" )","category":"page"},{"location":"bump_on_tail/#Bump-On-Tail","page":"Bump On Tail","title":"Bump On Tail","text":"","category":"section"},{"location":"bump_on_tail/","page":"Bump On Tail","title":"Bump On Tail","text":"using VlasovSolvers\nusing Plots\nusing LaTeXStrings","category":"page"},{"location":"bump_on_tail/","page":"Bump On Tail","title":"Bump On Tail","text":"\ndev = CPU()                  # device\nstepper = StrangSplitting()  # timestepper\ndt = 0.1                     # timestep\nnsteps = 1000                # total number of time-steps\n\nα   = 0.03\nkx  = 0.3\n\nn1, n2 = 32, 64\nx1min, x1max = 0.0, 2π / kx\nx2min, x2max = -9., 9.\n\nmesh1 = OneDGrid(dev, n1, x1min, x1max)\nmesh2 = OneDGrid(dev, n2, x2min, x2max)\n\nf = DistributionFunction( mesh1, mesh2 )\n\n\nfor (i,x) in enumerate(mesh1.points), (j,v) in enumerate(mesh2.points)\n    f.values[i,j]  = (1.0+α*cos(kx*x)) / (10*sqrt(2π)) * (9*exp(-0.5*v^2)+2*exp(-2*(v-4.5)^2))\nend\n","category":"page"},{"location":"bump_on_tail/","page":"Bump On Tail","title":"Bump On Tail","text":"nsteps = 500\nt   = range(0.0, stop=50.0, length=nsteps)\ndt  = t[2]\n\nprob = VlasovProblem(f, BSLSpline(5), dev)\n\nsol = solve!(prob, stepper, dt, nsteps )","category":"page"},{"location":"bump_on_tail/","page":"Bump On Tail","title":"Bump On Tail","text":"plot(t, sol, label=L\"\\frac{1}{2} \\log(∫e²dx)\")","category":"page"},{"location":"problem/#Vlasov-Problem","page":"Problem type","title":"Vlasov Problem","text":"","category":"section"},{"location":"problem/","page":"Problem type","title":"Problem type","text":"Modules = [VlasovSolvers]\nOrder   = [:type, :function]\nPages   = [\"problems.jl\"]","category":"page"},{"location":"problem/#VlasovSolvers.VlasovProblem","page":"Problem type","title":"VlasovSolvers.VlasovProblem","text":"VlasovProblem( f, method, dev)\n\n\n\n\n\n","category":"type"},{"location":"problem/#VlasovSolvers.solve!-Tuple{VlasovProblem{BSLSpline},StrangSplitting,Any,Any}","page":"Problem type","title":"VlasovSolvers.solve!","text":"solve!( problem, stepper, dt, nsteps)\n\n\n\n\n\n","category":"method"},{"location":"#VlasovSolvers.jl-Documentation","page":"Home","title":"VlasovSolvers.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"First draft of a Vlasov solvers Julia suite.","category":"page"},{"location":"#Numerical-methods","page":"Home","title":"Numerical methods","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Backward Semi-Lagrangian\nPseudo-Spectral","category":"page"},{"location":"#Equations","page":"Home","title":"Equations","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The Vlasov equation can be split into two parts ","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + vcdot nabla_x f=0  mathrm and   partial_t f +\nEcdot nabla_v f=0 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"so that the numerical solution can be approximated by the successive solution of each part of this splitting. Indeed, if we denote varphi^x_t(f_0) the solution at time t of","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + vcdot nabla_x f=0 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"and varphi^v_t(f_0) the solution at time t of","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + Ecdot nabla_v f=0 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"then the solution varphi_t(f_0) of the Vlasov equation can be approximated by","category":"page"},{"location":"","page":"Home","title":"Home","text":"varphi_t(f_0) approx varphi^v_t circ varphi^x_t(f_0)  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is the Lie-Trotter splitting which is a first order approximatoin of the solution f(t). High  order splittings can be derived by choosing a sequence of coefficients (a_i b_i) so that","category":"page"},{"location":"","page":"Home","title":"Home","text":"varphi_t(f_0) approx Pi_i   Big(varphi^v_a_i t circ varphi^x_b_i tBig)(f_0)  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The splitting enables to reduce the original problem into several smaller problems which are easier to solve. Indeed, in the Vlasov case, we are lead to solve one dimensional linear transport equations which we choose to solve using the semi-Lagrangian method.  The basics of the semi-Lagrangian method are recalled in the following. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"We  consider the following linear transport equation ","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + a partial_x f=0 f(t=0 x) = f_0(x) xin 0 L ","category":"page"},{"location":"","page":"Home","title":"Home","text":"with periodic boundary conditions. We know that the exact solution can be written as","category":"page"},{"location":"","page":"Home","title":"Home","text":"f(t x) = f_0(x-at) ","category":"page"},{"location":"","page":"Home","title":"Home","text":"or if we consider the solution from  s to t`, we have","category":"page"},{"location":"","page":"Home","title":"Home","text":"f(t x) = f(s x-a(t-s))  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The property that f is constant along the characteristics paves the way of the semi-Lagrangian method. Indeed, let consider a time discretization t_n = nDelta t nin mathbbN, Delta t0 and a space discretization x_i=iDelta x iin mathbbN Delta x0 Delta x=LN_x where N_x is the number of points.  Considering t=t_n+1 s=t_n and x=x_i in the former equation, we get ","category":"page"},{"location":"","page":"Home","title":"Home","text":"f(t_n+1 x_i) = f(t_n x_i-a Delta t)  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"We assume that f(t_n x_i) are all known, we have to compute f(t_n x_i-a Delta t) and this is done by a standard interpolation method. For Vlasov problem, high order interpolation are required (citer Francis, Sonnen, Michel...).  Within the framework of this package, there are two possibilities: Lagrange or B-splines interpolation (of odd degree).  Arbitrary high order is available and have been tested according to recent estimates (citer Michel-Latu-Sonnen). For p order Lagrange interpolation, we have","category":"page"},{"location":"","page":"Home","title":"Home","text":"f(t_n x) = sum_i=0^k f(t_n x_i) L_ip(x) ","category":"page"},{"location":"","page":"Home","title":"Home","text":"where ","category":"page"},{"location":"","page":"Home","title":"Home","text":"L_ip(x) = Pi_0leq kleq p kneq i fracx-x_kx_i-x_k \nmathrm for  0leq ileq p  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"For the B-spline interpolation of order p, we have","category":"page"},{"location":"","page":"Home","title":"Home","text":"f(t_n x) = sum_i=0^N_x-1 eta_i B_ip(x) ","category":"page"},{"location":"","page":"Home","title":"Home","text":"where ","category":"page"},{"location":"","page":"Home","title":"Home","text":"B_i0(x) = left\nbeginmatrix\n1  mathrmif  quad t_i leq x  t_i+1 \n0  mathrmotherwise \nendmatrix\nright","category":"page"},{"location":"","page":"Home","title":"Home","text":"B_ip(x) = fracx - t_it_i+p - t_i B_ip-1(x) \n+ fract_i+p+1 - xt_i+p+1 - t_i+1 B_i+1p-1(x)","category":"page"},{"location":"","page":"Home","title":"Home","text":"and the coefficients (eta_i)_i=0 dots N_x-1 are solution of a linear system to solve.","category":"page"},{"location":"#Algorithm","page":"Home","title":"Algorithm","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Once the linear advection (or transport) equation are solved using the semi-Lagrangian method, the algorithm to solve the Vlasov-Poisson equation can be written. To do so, we consider a mesh in the truncated velocity domain -v_max v_max: v_j = -v_max + jDelta v j=0 dots N_v-1 Delta v=2v_max  N_v, N_v being the number of points in the velocity direction. The algorithm based on Lie-Trotter and semi-Lagrangian method is :","category":"page"},{"location":"","page":"Home","title":"Home","text":"Initialization. From the given initial condition f_0(x v) we can compute the initial electric field E_0(x). \nFrom t_n to t_n+1. Knowing all the grid point values of f^n and E^n","category":"page"},{"location":"","page":"Home","title":"Home","text":"Compute f^star solving","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + vpartial_x f=0 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"using the semi-Lagrangian method f^star(x_i v_j) = f^n(x_i-v_jDelta t v_j).","category":"page"},{"location":"","page":"Home","title":"Home","text":"Solve the electric field E^star  from the Poisson","category":"page"},{"location":"","page":"Home","title":"Home","text":"equation","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_x E^star = sum_j=0^N_v-1 f^star(x_i v_j) Delta v -1  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Compute f^n+1 solving","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + E^starpartial_v f = 0 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"using the semi-Lagrangian method f^n+1(x_i v_j) = f^n(x_i v_j-E^star(x_i) Delta t).","category":"page"},{"location":"#Numerical-method-for-Poisson-equation","page":"Home","title":"Numerical method for Poisson equation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The Poisson equation is solved using Fourier techniques. First, we consider the following DFT (Discrete Fourier Transform) of a L-periodic function g defined on a mesh of N points such that x_j=j Delta x Delta x=LN 0leq jleq N-1 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"hatg_k = frac1Nsum_j=0^N-1 g(x_j) e^-i frac2piL k\nx_j  k=0 dots N-1 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Thus, from the Poisson equation,  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_x E = rho -1 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"we consider the Fourier transform to get","category":"page"},{"location":"","page":"Home","title":"Home","text":"i k hatE_k = hatrho_k  mathrm  if     kneq 0 \nhatE_0=0  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Then, we can compute the Fourier coefficients hatE_k as","category":"page"},{"location":"","page":"Home","title":"Home","text":"hatE_k = frac1ikhatrho_k  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"and an inverse Fourier transform is used to get E_iapprox E(x_i). ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The extension of this algorithm to the multidimensional case requires to introduce the electric potential varphi such that E=-nabla_x phi. The scalar electric potential solves an elliptic Poisson equation","category":"page"},{"location":"","page":"Home","title":"Home","text":"-Delta phi = rho -1","category":"page"},{"location":"","page":"Home","title":"Home","text":"which is also solved using Fourier techniques. Now we get (now k is a vectorial wavenumber) ","category":"page"},{"location":"","page":"Home","title":"Home","text":"k^2 hatphi_k = hatrho_k  mathrm  if     kneq 0 \nhatphi_0=0  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"so that hatphi_k = hatrho_kk^2 and the electric field can be computed using","category":"page"},{"location":"","page":"Home","title":"Home","text":"hatE_k = -ik hatphi_k   mathrm  if     kneq 0 \nhatE_0=0  ","category":"page"},{"location":"","page":"Home","title":"Home","text":"and an inverse Fourier tranform.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Regarding the semi-Lagrangian method applied to the multidimensional advection with xin mathbbR^d and vin mathbbR^d ","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + vcdot nabla_x f = 0  mathrm or  \npartial_t f + Ecdot nabla_v f = 0 ","category":"page"},{"location":"","page":"Home","title":"Home","text":"we can use the fact that these advection can be split (exactly) into one-dimensional linear transport equations. Indeed for the x-transport part we have to successively solve ","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + v_alphapartial_x_alpha f= 0  mathrm for   alpha=1 dots d","category":"page"},{"location":"","page":"Home","title":"Home","text":"whereas for the v-transport part we have to successively solve ","category":"page"},{"location":"","page":"Home","title":"Home","text":"partial_t f + E_alphapartial_v_alpha f= 0  mathrm for    alpha=1 dots\nd ","category":"page"},{"location":"rotation2d/#Rotation-of-a-gaussian-distribution","page":"Rotation 2D","title":"Rotation of a gaussian distribution","text":"","category":"section"},{"location":"rotation2d/","page":"Rotation 2D","title":"Rotation 2D","text":"fracdfdt +  (y fracdfdx - x fracdfdy) = 0","category":"page"},{"location":"rotation2d/","page":"Rotation 2D","title":"Rotation 2D","text":"using Plots\nusing VlasovSolvers\nusing FFTW, LinearAlgebra","category":"page"},{"location":"rotation2d/","page":"Rotation 2D","title":"Rotation 2D","text":"\"\"\"\n    exact(tf, mesh)\n\nExact solution of the gaussian rotation\n\n\"\"\"\nfunction exact!(f, t, x, y)\n    for (i, xx) in enumerate(x), (j, yy) in enumerate(y)\n        xn = cos(t)*xx - sin(t)*yy\n        yn = sin(t)*xx + cos(t)*yy\n        f[i,j] = exp(-(xn-1)^2/0.1)*exp(-(yn-1)^2/0.1)\n    end\n    f\nend","category":"page"},{"location":"rotation2d/","page":"Rotation 2D","title":"Rotation 2D","text":"dev = CPU()\nn1, n2 = 256, 256\nmesh1 = OneDGrid(dev, n1, -pi, pi)\nmesh2 = OneDGrid(dev, n2, -pi, pi)\n\nf = zeros(Float64,(n1,n2))\n\nanim = @animate for t in LinRange(0,20π,200)\n    exact!(f, t, mesh1.points, mesh2.points)\n    contour(f, aspect_ratio=:equal, frame=:none, legend=:none)\nend\ngif(anim, \"assets/rotation.gif\", fps = 15) # hide\nnothing # hide","category":"page"},{"location":"rotation2d/","page":"Rotation 2D","title":"Rotation 2D","text":"(Image: rotation)","category":"page"},{"location":"rotation2d/","page":"Rotation 2D","title":"Rotation 2D","text":"x = mesh1.points\ny = mesh2.points\n\nnsteps = 1000\ntf = 200 * pi\ndt = tf/nsteps\n\nkx = 2π/(mesh1.stop-mesh1.start)*[0:mesh1.len÷2-1;mesh1.len÷2-mesh1.len:-1]\nky = 2π/(mesh2.stop-mesh2.start)*[0:mesh2.len÷2-1;mesh2.len÷2-mesh2.len:-1]\n\nf  = zeros(Complex{Float64},(mesh1.len,mesh2.len))\nf̂  = similar(f)\nfᵗ = zeros(Complex{Float64},(mesh1.len,mesh2.len))\nf̂ᵗ = similar(fᵗ)\n\nexky = exp.( 1im*tan(dt/2) .* mesh1.points' .* ky ) |> collect\nekxy = exp.(-1im*sin(dt)   .* mesh2.points' .* kx ) |> collect\n\nFFTW.set_num_threads(4)\nPx = plan_fft(f,  1, flags=FFTW.PATIENT)    \nPy = plan_fft(fᵗ, 1, flags=FFTW.PATIENT)\n\nexact!(f, 0.0, mesh1.points, mesh2.points)\n    \nfor n = 1:nsteps\n    transpose!(fᵗ,f)\n    mul!(f̂ᵗ, Py, fᵗ)\n    f̂ᵗ .= f̂ᵗ .* exky\n    ldiv!(fᵗ, Py, f̂ᵗ)\n    transpose!(f,fᵗ)\n    \n    mul!(f̂, Px, f)\n    f̂ .= f̂ .* ekxy \n    ldiv!(f, Px, f̂)\n    \n    transpose!(fᵗ,f)\n    mul!(f̂ᵗ, Py, fᵗ)\n    f̂ᵗ .= f̂ᵗ .* exky\n    ldiv!(fᵗ, Py, f̂ᵗ)\n    transpose!(f,fᵗ)\nend\n\ntest = zeros(mesh1.len, mesh2.len)\nexact!(test, tf, mesh1.points, mesh2.points)\nprintln(maximum(abs.(real(f) .- test)))","category":"page"},{"location":"vlasov-hmf/#Vlasov-HMF","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"","category":"section"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"using LinearAlgebra, QuadGK, Roots, FFTW\nusing VlasovSolvers\nusing Plots","category":"page"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"function mag(β, mass)\n\n    F(m) = begin\n        g(x, n, m) = (1 / π) * (exp(β * m * cos(x)) * cos(n * x))\n        bessel0(x) = g(x, 0, m)\n        bessel1(x) = g(x, 1, m)\n        mass * quadgk(bessel1, 0, π)[1] / quadgk(bessel0, 0, π)[1] - m\n    end\n    find_zero(F, (0, mass))\nend","category":"page"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"function Norm(f::Array{Float64,2}, delta1, delta2)\n   delta1 * sum(delta2 * sum(real(f), dims=1))\nend","category":"page"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"\"\"\"\n    hmf_poisson!(fᵗ    :: Array{Complex{Float64},2},\n                 mesh1 :: OneDGrid,\n                 mesh2 :: OneDGrid,\n                 ex    :: Array{Float64})\n\n    Compute the electric hamiltonian mean field from the\n    transposed distribution function\n\n\"\"\"\nfunction hmf_poisson!(fᵗ::Array{Complex{Float64},2},\n        mesh1::OneDGrid,\n        mesh2::OneDGrid,\n        ex::Array{Float64})\n\n    n1 = mesh1.len\n    rho = mesh2.step .* vec(sum(fᵗ, dims=1))\n    kernel = zeros(Float64, n1)\n    k = π / (mesh1.stop - mesh1.start)\n    kernel[2] = k\n    ex .= real(ifft(1im * fft(rho) .* kernel * 4π ))\n\nend","category":"page"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"dev = CPU()\nnsteps = 1000\ndt = 0.1\n\nmass = 1.0\nT = 0.1\nmesh1 = OneDGrid(dev, 64, -π, π)\nmesh2 = OneDGrid(dev, 128, -6, 6)\n\nn1, delta1 = mesh1.len, mesh1.step\nn2, delta2 = mesh2.len, mesh2.step\nx, v = mesh1.points, mesh2.points'\nϵ = 0.1\n\nb = 1 / T\nm = mag(b, mass)\n\nw   = sqrt(m)\nf   = zeros(Complex{Float64}, (n1,n2))\nfᵗ  = zeros(Complex{Float64}, (n2,n1))\n\nf  .= exp.(-b .* ((v.^2 / 2) .- m .* cos.(x)))\ntranspose!(fᵗ, f)\n@show size(f), size(fᵗ)\ncontour(mesh1.points, mesh2.points, real(fᵗ))","category":"page"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"a   = mass / Norm(real(f), delta1, delta2)\n\n@.  f .=  a * exp(-b * (((v^2) / 2) - m * cos(x))) * (1 + ϵ * cos(x))\n\nex = zeros(Float64,n1)\nhmf_poisson!(fᵗ, mesh1, mesh2, ex )\ntest = copy(f)\nT = Float64[]\nplot(x, ex)","category":"page"},{"location":"vlasov-hmf/","page":"Vlasov-HMF","title":"Vlasov-HMF","text":"import VlasovSolvers: advection!\n\nadvection!(fᵗ, mesh2, ex, 0.5dt)\n\nfor n in 1:nsteps\n\n    gamma1 = Norm(real(f) .* cos.(x), delta1, delta2)\n    push!(T,gamma1)\n    \n    advection!(f, mesh1, v, dt)\n    transpose!(fᵗ, f)\n    hmf_poisson!(fᵗ, mesh1, mesh2, ex)\n    advection!(fᵗ, mesh2, ex, dt)\n    transpose!(f, fᵗ)\n\nend\n\n# Substracting from gamma its long time average\n\nGamma1 = Norm(real(f) .* cos.(x), delta1, delta2)\n\nT .= T .- Gamma1\n\nt = range(0., stop=nsteps*dt, length=nsteps) |> collect\nT .= abs.(T)\n\nplot(t, log.(T), xlabel = \"t\", ylabel = \"|C[f](t)-C[f][T]|\");","category":"page"}]
}
