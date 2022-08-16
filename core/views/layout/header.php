<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="../public/assets/js/jquery-3.6.0.min.js"></script>
  <script src="../public/assets/js/jquery.datetimepicker.full.min.js"></script>
  <script src="../public/assets/js/moment-with-locales.js"></script>
  <script src="../public/assets/js/bootstrap.bundle.min.js"></script>
  <script src="../public/assets/js/fontawesome_all.min.js"></script>
  <script src="../public/assets/js/datatables.min.js"></script>
  <script src="../public/assets/js/dataTables.responsive.min.js"></script>
  <script src="../public/assets/js/dataTables.buttons.min.js"></script>
  <script src="../public/assets/js/jszip.min.js"></script>
  <script src="../public/assets/js/pdfmake.min.js"></script>
  <script src="../public/assets/js/vfs_fonts.js"></script>
  <script src="../public/assets/js/buttons.html5.min.js"></script>
  <script src="../public/assets/js/buttons.print.min.js"></script>
  <script src="../public/assets/js/main.js"></script>
  <script src="../public/assets/js/func.js"></script>
  <link rel="stylesheet" href="../public/assets/css/jquery.datetimepicker.min.css" />
  <link rel="stylesheet" href="../public/assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="../public/assets/css/fontawesome_all.min.css" />
  <link rel="stylesheet" href="../public/assets/css/datatables.min.css" />
  <link rel="stylesheet" href="../public/assets/css/responsive.dataTables.min.css" />
  <link rel="stylesheet" href="../public/assets/css/buttons.dataTables.min.css" />
  <link rel="stylesheet" href="../public/assets/css/main.css" />
</head>

<body>
  <?php if ($sessaoIniciada) { ?>
    <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar" class="active">
        <h1 class="logo">TJ</h1>
        <div class="div-user">
          <span class="circle-user"><?php echo $_SESSION['user']->nome[0] ?></span>
          <span>&nbsp;&nbsp;<?php echo $_SESSION['user']->nome ?></span>
        </div>
        <ul class="list-unstyled components mb-5">
          <li classsidebar="active">
            <a href="../public/index.php">
              <span>
                <i class="fa-solid fa-house-chimney"></i>
              </span> Domicile</a>
          </li>
          <li classsidebar="active">
            <a href="../public/index.php?a=user_options">
              <span>
                <i class="fa-solid fa-user-gear"></i>
              </span> Options</a>
          </li>
          <li>
            <a href="../public/index.php?a=clients">
              <span>
                <i class="fa-solid fa-address-card"></i>
              </span> Clients</a>
          </li>
          <li>
            <a href="../public/index.php?a=trabalhos">
              <span>
                <i class="fa-regular fa-file-lines"></i>
              </span> Chantiers</a>
          </li>
          <li>
            <a href="../public/index.php?a=colaboradores">
              <span>
                <i class="fa-solid fa-people-group"></i>
              </span> Employés</a>
          </li>
          <li>
            <a href="../public/index.php?a=history_clients">
              <span>
                <i class="fa-solid fa-trash-can"></i>
              </span> Clients éliminés</a>
          </li>
        </ul>

        <div class="footer">
          <p>
            Copyright
          </p>
        </div>
      </nav>
      <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid row">
            <div class="col-md-1 col-sm-1 col-1">
              <button type="button" id="sidebarCollapse" class="btn btn-primary">
                <i class="fa fa-bars"></i>
                <span class="sr-only">Toggle Menu</span>
              </button>
            </div>
            <div class="collapse navbar-collapse col-md-3" id="navbarSupportedContent">
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="../public/index.php">Domicile</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="../public/index.php?a=clients">Clients</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="../public/index.php?a=trabalhos">Chantiers</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="../public/index.php?a=colaboradores">Employés</a>
                </li>
              </ul>

            </div>
            <div class="col-md-6 col-sm-9 col-9 div-input-with-icon">
              <input id="inputPesquisaAll" type="search" class="text-search" placeholder="Chercher..." />
              <span><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>

          </div>
        </nav>
      <?php } ?>